export interface Column {
  display_name: string
  editable: boolean
  unique: boolean
  required: boolean
  type: string
}

export function typeNameMap(type: string) {
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
