import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../../services/noteService'
import css from './NoteForm.module.css'

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(
    ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']
  ).required(),
})

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onClose()
    },
  })

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={schema}
      onSubmit={values => mutation.mutate(values)}
    >
      <Form className={css.form}>
        <Field name="title" />
        <Field name="content" as="textarea" />
        <Field name="tag" as="select">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <div className={css.actions}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Create note</button>
        </div>
      </Form>
    </Formik>
  )
}