export interface Column {
  display_name: string
  editable: boolean
  unique: boolean
  required: boolean
  type: string
}

export function typeMap(type: string) {
  switch (type) {
    case 'richText':
      return 'rich text'
    case 'timestamptz':
      return 'timestamp'
    case 'simpleText':
      return 'simple text'
    case 'singleMedia':
      return 'single media'
    case 'multipleMedia':
      return 'multiple media'
    default:
      return type
  }
}

export function columnMap(column: string) {
  switch (column) {
    case 'id':
      return 'ID'
    case 'created_at':
      return 'Created At'
    case 'updated_at':
      return 'Updated At'
    default:
      return column
  }
}

export const staticColumns = ['id', 'created_at', 'updated_at']
