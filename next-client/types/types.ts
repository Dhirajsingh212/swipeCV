export type FieldType = 'text' | 'multipleChoice' | 'checkbox' | 'date' | 'file'

export interface Field {
  id: string
  type: FieldType
  label: string
  options?: string[]
}
