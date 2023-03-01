export interface Column {
  display_name: string
  editable: boolean
  unique: boolean
  required: boolean
  type: ColumnType
}

type ColumnType = 'timestamptz' | 'int4' | 'text' | 'varchar'

export function typeMap(type: ColumnType) {
  switch (type) {
    case 'int4':
      return 'integer'
    case 'text':
      return 'rich text'
    case 'timestamptz':
      return 'timestamp'
    case 'varchar':
      return 'simple text'
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
