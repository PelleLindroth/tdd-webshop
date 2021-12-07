import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'

const renderWithRouter = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: MemoryRouter, ...options })

const withPath = (entry: string, element: ReactElement, path: string) => (
  <MemoryRouter initialEntries={[entry]}>
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  </MemoryRouter>
)
export { renderWithRouter, withPath }
