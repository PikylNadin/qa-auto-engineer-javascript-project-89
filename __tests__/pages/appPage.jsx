import { expect } from 'vitest'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import App from '../../src/App.jsx'
import { openWidgetButtonText, registrationButtonText, formLabels, modalTitleText, closeButtonLabel, tableBackButtonText } from '../utils/utils.js'

class AppPage {
  static renderApp() {
    render(<App />)
  }

  static get openWidgetButton() {
    return screen.getByText(openWidgetButtonText)
  }

  static async clickOpenWidgetButton() {
    fireEvent.click(this.openWidgetButton)
  }

  static get registrationButton() {
    return screen.getByText(registrationButtonText)
  }

  static async clickRegistrationButton() {
    await fireEvent.click(this.registrationButton)
  }

  static get backButton() {
    return screen.getByText(tableBackButtonText)
  }

  static async clickBackButton() {
    fireEvent.click(this.backButton)
  }

  static closeWidget() {
    const closeButton = screen.getByRole('button', {
      name: closeButtonLabel,
    })
    fireEvent.click(closeButton)
  }

  static waitForModalToClose() {
    return waitFor(() => {
      expect(screen.queryByText(modalTitleText)).not.toBeInTheDocument()
    })
  }

  static expectRegistrationButton() {
    expect(this.registrationButton).toBeInTheDocument()
  }

  static expectOpenWidgetButton() {
    expect(this.openWidgetButton).toBeInTheDocument()
  }

  static expectModalTitle() {
    expect(screen.getByText(modalTitleText)).toBeInTheDocument()
  }

  static getFormInputLabel(label) {
    return screen.getByLabelText(formLabels[label])
  }

  static fillOutForm() {
    fireEvent.change(this.getFormInputLabel('Email'), {
      target: {
        value: 'test@example.com',
      },
    })
    fireEvent.change(this.getFormInputLabel('Пароль'), {
      target: {
        value: 'testpassword',
      },
    })
    fireEvent.change(this.getFormInputLabel('Адрес'), {
      target: {
        value: 'Тестовый адрес, тестовый номер',
      },
    })
    fireEvent.change(this.getFormInputLabel('Город'), {
      target: {
        value: 'Липецк',
      },
    })
    fireEvent.change(this.getFormInputLabel('Страна'), {
      target: {
        value: 'Россия',
      },
    })
    fireEvent.click(this.getFormInputLabel('Принять правила'))
  }

  static expectFormValues() {
    expect(this.getFormInputLabel('Email').value).toBe('test@example.com')
    expect(this.getFormInputLabel('Пароль').value).toBe('testpassword')
    expect(this.getFormInputLabel('Адрес').value).toBe('Тестовый адрес, тестовый номер')
    expect(this.getFormInputLabel('Город').value).toBe('Липецк')
    expect(this.getFormInputLabel('Страна').value).toBe('Россия')
    expect(this.getFormInputLabel('Принять правила').checked).toBe(true)
  }

  static async expectFormSubmission() {
    try {
      const emailElement = await screen.findByText('Email')
      expect(emailElement.nextSibling).toHaveTextContent('test@example.com')

      const passwordElement = await screen.findByText('Пароль')
      expect(passwordElement.nextSibling).toHaveTextContent('testpassword')

      const addressElement = await screen.findByText('Адрес')
      expect(addressElement.nextSibling).toHaveTextContent('Тестовый адрес, тестовый номер')

      const cityElement = await screen.findByText('Город')
      expect(cityElement.nextSibling).toHaveTextContent('Липецк')

      const countryElement = await screen.findByText('Страна')
      expect(countryElement.nextSibling).toHaveTextContent('Россия')

      const rulesElement = await screen.findByText('Принять правила')
      expect(rulesElement.nextSibling).toHaveTextContent('true')
    }

    catch (error) {
      console.error('Table not found or content incorrect within timeout:', error)
      throw error
    }
  }
}

export default AppPage
