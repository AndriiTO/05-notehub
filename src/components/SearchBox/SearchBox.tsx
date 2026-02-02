import css from './SearchBox.module.css'

export default function SearchBox({
  onSearch,
}: {
  onSearch: (value: string) => void
}) {
  return (
    <input
      className={css.input}
      placeholder="Search notes"
      onChange={e => onSearch(e.target.value)}
    />
  )
}