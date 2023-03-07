export interface Column {
  display_name: string
  editable: boolean
  unique: boolean
  required: boolean
  type: ColumnTypes
}

export type ColumnTypes =
  | 'richText'
  | 'timestamptz'
  | 'singleLine'
  | 'multiLine'
  | 'singleMedia'
  | 'multipleMedia'
  | 'integer'
  | 'decimal'
  | 'boolean'

export function typeNameMap(type: ColumnTypes) {
  switch (type) {
    case 'richText':
      return 'rich text'
    case 'timestamptz':
      return 'timestamp'
    case 'singleLine':
      return 'single line text'
    case 'multiLine':
      return 'multi line text'
    case 'singleMedia':
      return 'single media'
    case 'multipleMedia':
      return 'multiple media'
    default:
      return type
  }
}
