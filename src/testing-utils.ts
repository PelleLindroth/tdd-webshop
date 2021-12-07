import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'

const renderWithRouter = (ui: ReactElement, options?: any) => render(ui, { wrapper: MemoryRouter, ...options })

export { renderWithRouter }
