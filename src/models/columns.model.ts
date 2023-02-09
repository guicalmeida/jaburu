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

export const staticColumns = ['id', 'created_at', 'updated_at']
