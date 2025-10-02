import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { test, describe, beforeEach, vi, expect } from 'vitest'
import AppPage from './pages/appPage.jsx'
import WidgetPage from './pages/widgetPage.jsx'
import textSet from '../__fixtures__/textSet.jsx'
import steps from '../__fixtures__/steps.js'

describe('Testing of the main section of the application', () => {
  beforeEach(() => {
    AppPage.renderApp()
  })

  test('Check the right render of the form and the availability of the form submission button', () => {
    AppPage.expectRegistrationButton()
  })

  test('Check the data entry into the form', async () => {
    await AppPage.fillOutForm()
    AppPage.expectFormValues()
    await AppPage.clickRegistrationButton()
    await AppPage.expectFormSubmission()
    await AppPage.clickBackButton()
    AppPage.expectRegistrationButton()
  })
})

describe('Testing of the widget section of the application', () => {
  test('Check the functions of the chat', async () => {
    WidgetPage.renderWidget(steps)
    window.HTMLDivElement.prototype.scrollIntoView = vi.fn()
    await WidgetPage.clickOpenWidgetButton()
    await WidgetPage.clickStartConversationButton()
    expect(screen.getByText(textSet.startConversationText)).toBeInTheDocument()
    WidgetPage.expectChangeProfessionButton()
    WidgetPage.expectTryITButton()
    WidgetPage.expectDeveloperButton()
    await WidgetPage.closeWidget()
    await WidgetPage.waitForModalToClose()
    WidgetPage.expectOpenWidgetButton()
  })
})
