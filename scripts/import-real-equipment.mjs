import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceRoot = 'C:\\Users\\Kirill\\Downloads\\good_chopped_output\\good_chopped_output'
const backendRoot = 'C:\\proj\\vess-equipment-co\\backend'
const mediaRoot = path.join(backendRoot, 'app', 'static', 'media', 'equipment')
const migrationPath = path.join(backendRoot, 'alembic', 'versions', '0003_replace_with_real_equipment.py')

const sectionNames = new Set([
  'Engine',
  'Transmission',
  'Chassis',
  'Operators station',
  'Features',
  'Loader',
  'Bucket',
  'Forks',
  'Backhoe',
  'Tires',
  'Tracks',
  'Notes',
  'Attachments',
  'Hydraulics',
])

const stopLinePatterns = [
  /^Dealer inventory reduction/i,
  /^Please review/i,
  /^Group Extension/i,
  /^Items:?$/i,
]

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const naturalSort = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

const parseTitle = (title) => {
  const year = Number(title.match(/^\d{4}/)?.[0] ?? 0)
  const brand = title.includes('John Deere')
    ? 'John Deere'
    : title.includes('Case International')
      ? 'Case International'
      : title.includes('Case IH')
        ? 'Case IH'
        : title.includes('Caterpillar')
          ? 'Caterpillar'
          : title.includes('Bobcat')
            ? 'Bobcat'
            : 'Other'
  const category = title.includes('backhoe')
    ? 'Backhoes'
    : title.includes('wheel loader')
      ? 'Wheel Loaders'
      : title.includes('skid steer')
        ? 'Skid Steers'
        : title.includes('tractor')
          ? 'Tractors'
          : 'Equipment'
  const model = title
    .replace(/^\d{4}\s+/, '')
    .replace(brand, '')
    .replace(/\b(backhoe|wheel loader|tracked skid steer loader|MFWD tractor|tractor|high lift)\b/gi, '')
    .trim()

  return { year, brand, category, model: model || title }
}

const parseInfo = (text) => {
  const rawLines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  const stopIndex = rawLines.findIndex((line) => stopLinePatterns.some((pattern) => pattern.test(line)))
  const lines = stopIndex >= 0 ? rawLines.slice(0, stopIndex) : rawLines
  const title = lines[0]
  const { year, brand, category, model } = parseTitle(title)
  const serial = lines.find((line) => line.startsWith('Serial:'))?.replace('Serial:', '').trim() ?? null
  const stock = lines.find((line) => line.startsWith('Unit #:'))?.replace('Unit #:', '').trim() ?? null
  const hoursText = lines.find((line) => line.startsWith('Hours:'))?.replace('Hours:', '').trim() ?? ''
  const hours = Number(hoursText.match(/[\d,]+/)?.[0]?.replaceAll(',', '') ?? '') || null
  const features = []
  const specs = {}
  let currentSection = 'General'

  for (const line of lines.slice(1)) {
    if (sectionNames.has(line)) {
      currentSection = line
      specs[currentSection] ??= []
      continue
    }

    specs[currentSection] ??= []
    specs[currentSection].push(line)

    if (
      !line.includes(':') &&
      line.length > 2 &&
      !/^\d+[FR]?\s*-?\s*\d*[R]?$/i.test(line) &&
      features.length < 12
    ) {
      features.push(line)
    }
  }

  const description = lines.slice(1).join('\n')
  const shortDescription = `${year} ${brand} ${category.toLowerCase()} with ${hours ? `${hours.toLocaleString('en-US')} hours` : 'documented equipment details'} and dealer-provided specifications.`

  return {
    title,
    year,
    brand,
    model,
    category,
    serial_number: serial,
    stock_number: stock,
    engine_hours: hours,
    features: features.length ? features : ['Dealer provided details', 'Inspection information available'],
    specs,
    description,
    short_description: shortDescription,
  }
}

const pyString = (value) => JSON.stringify(value)
const pyValue = (value) => {
  if (value === null || value === undefined) return 'None'
  if (typeof value === 'boolean') return value ? 'True' : 'False'
  if (typeof value === 'number') return String(value)
  return JSON.stringify(value, null, 12)
}

const buildMigration = (items) => `"""replace demo equipment with real inventory

Revision ID: 0003_replace_with_real_equipment
Revises: 0002_add_real_equipment_photos
Create Date: 2026-05-29
"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op


revision: str = "0003_replace_with_real_equipment"
down_revision: Union[str, Sequence[str], None] = "0002_add_real_equipment_photos"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


equipment_table = sa.table(
    "equipment",
    sa.column("id", sa.String()),
    sa.column("slug", sa.String()),
    sa.column("title", sa.String()),
    sa.column("category", sa.String()),
    sa.column("brand", sa.String()),
    sa.column("model", sa.String()),
    sa.column("year", sa.Integer()),
    sa.column("condition", sa.String()),
    sa.column("status", sa.String()),
    sa.column("stock_number", sa.String()),
    sa.column("serial_number", sa.String()),
    sa.column("price", sa.Integer()),
    sa.column("engine_hours", sa.Integer()),
    sa.column("power_hp", sa.Integer()),
    sa.column("location", sa.String()),
    sa.column("short_description", sa.String()),
    sa.column("description", sa.Text()),
    sa.column("images", sa.JSON()),
    sa.column("features", sa.JSON()),
    sa.column("specs", sa.JSON()),
    sa.column("featured", sa.Boolean()),
    sa.column("financing_available", sa.Boolean()),
    sa.column("delivery_available", sa.Boolean()),
)


def upgrade() -> None:
    op.execute(sa.text("DELETE FROM leads"))
    op.execute(sa.text("DELETE FROM equipment"))
    op.bulk_insert(
        equipment_table,
        [
${items.map((item) => `            {
                "id": ${pyString(item.id)},
                "slug": ${pyString(item.slug)},
                "title": ${pyString(item.title)},
                "category": ${pyString(item.category)},
                "brand": ${pyString(item.brand)},
                "model": ${pyString(item.model)},
                "year": ${item.year},
                "condition": "Pre-Owned",
                "status": "Available",
                "stock_number": ${pyValue(item.stock_number)},
                "serial_number": ${pyValue(item.serial_number)},
                "price": 0,
                "engine_hours": ${pyValue(item.engine_hours)},
                "power_hp": None,
                "location": "Staunton, VA",
                "short_description": ${pyString(item.short_description)},
                "description": ${pyString(item.description)},
                "images": ${JSON.stringify(item.images, null, 16)},
                "features": ${JSON.stringify(item.features, null, 16)},
                "specs": ${JSON.stringify(item.specs, null, 16)},
                "featured": ${item.featured ? 'True' : 'False'},
                "financing_available": True,
                "delivery_available": True,
            }`).join(',\n')}
        ],
    )


def downgrade() -> None:
    op.execute(sa.text("DELETE FROM leads"))
    op.execute(sa.text("DELETE FROM equipment"))
`

const main = async () => {
  await fs.rm(mediaRoot, { recursive: true, force: true })
  await fs.mkdir(mediaRoot, { recursive: true })

  const entries = (await fs.readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => naturalSort(a.name, b.name))

  const items = []

  for (const [index, entry] of entries.entries()) {
    const folderPath = path.join(sourceRoot, entry.name)
    const info = parseInfo(await fs.readFile(path.join(folderPath, 'info.txt'), 'utf8'))
    const slug = slugify(info.title)
    const outDir = path.join(mediaRoot, slug)
    const photosDir = path.join(folderPath, 'Fotos')
    const photoNames = (await fs.readdir(photosDir))
      .filter((name) => /\.(jpe?g|png)$/i.test(name))
      .sort(naturalSort)

    await fs.mkdir(outDir, { recursive: true })

    const images = []
    for (const [photoIndex, photoName] of photoNames.entries()) {
      const filename = `${String(photoIndex + 1).padStart(3, '0')}.webp`
      const output = path.join(outDir, filename)
      await sharp(path.join(photosDir, photoName))
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(output)
      images.push(`/media/equipment/${slug}/${filename}`)
    }

    items.push({
      ...info,
      id: `eq-real-${String(index + 1).padStart(3, '0')}`,
      slug,
      images,
      featured: index < 4,
    })

    console.log(`${info.title}: ${images.length} photos`)
  }

  await fs.writeFile(migrationPath, buildMigration(items))
  console.log(`Wrote migration: ${migrationPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
