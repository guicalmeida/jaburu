export interface Column {
  columnName: string
  required: boolean
  type: ColumnType
}

type ColumnType = 'timestamptz' | 'int4' | 'text' | 'varchar'

export function typeMap(type: ColumnType) {
  switch (type) {
    case 'int4':
      return 'integer'
    case 'text':
      return 'markdown'
    case 'timestamptz':
      return 'timestamp'
    case 'varchar':
      return 'string'
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
