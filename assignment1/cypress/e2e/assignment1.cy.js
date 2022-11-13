const { expect } = require("chai")

describe('Positive Test Case', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type(`standard_user`)
    cy.get('[data-test="password"]').type(`secret_sauce`)
    cy.get('[data-test="login-button"]').click()
    cy.get('.title').should(`have.text`, `Products`)
  })
  afterEach(() => {
    cy.get('[data-test="checkout"]').click()
    cy.get('.title').should(`have.text`, `Checkout: Your Information`)
    cy.get('[data-test="firstName"]').type(`first name`)
    cy.get('[data-test="lastName"]').type(`last name`)
    cy.get('[data-test="postalCode"]').type(`postal code`)
    cy.get('[data-test="continue"]').click()
    cy.get('.title').should(`have.text`, `Checkout: Overview`)
    cy.get('@titleItem').then(titleItem => {
      cy.get('.inventory_item_name').invoke(`text`).then((text) =>{
        expect(text).to.be.equals(titleItem)
      })
    })
    cy.get(`@priceItem`).then((priceItem) => {
      cy.get('.inventory_item_price').invoke(`text`).then((text) => {
        expect(text).to.be.equals(priceItem)
      })
    })
    cy.get('[data-test="finish"]').click()
    cy.get('.title').should(`have.text`, `Checkout: Complete!`)
  })
  it('Checkout item via add to cart on dashboard', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('#item_4_title_link > .inventory_item_name').invoke(`text`).then((text) => {
      const titleItem = text
      cy.wrap(titleItem).as (`titleItem`)
    })
    cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').invoke(`text`).then((text) => {
      const priceItem = text
      cy.wrap(priceItem).as (`priceItem`)
    })
    cy.get('.shopping_cart_link').click()
    cy.get('.title').should(`have.text`, `Your Cart`)
    cy.get('@titleItem').then(titleItem => {
      cy.get('.inventory_item_name').invoke(`text`).then((text) =>{
        expect(text).to.be.equals(titleItem)
      })
    })
    cy.get(`@priceItem`).then((priceItem) => {
      cy.get('.inventory_item_price').invoke(`text`).then((text) => {
        expect(text).to.be.equals(priceItem)
      })
    })
  })
  it('Checkout item via add to cart on item detail page', () => {
    cy.get('#item_4_title_link > .inventory_item_name').click()
    cy.get('.inventory_details_name').invoke(`text`).then((text) => {
      const titleItem = text
      cy.wrap(titleItem).as (`titleItem`)
    })
    cy.get('.inventory_details_price').invoke(`text`).then((text) => {
      const priceItem = text
      cy.wrap(priceItem).as (`priceItem`)
    })
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('.title').should(`have.text`, `Your Cart`)
    cy.get('@titleItem').then(titleItem => {
      cy.get('.inventory_item_name').invoke(`text`).then((text) =>{
        expect(text).to.be.equals(titleItem)
      })
    })
    cy.get(`@priceItem`).then((priceItem) => {
      cy.get('.inventory_item_price').invoke(`text`).then((text) => {
        expect(text).to.be.equals(priceItem)
      })
    })
  })
})
describe('Negative Test Case', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type(`standard_user`)
    cy.get('[data-test="password"]').type(`secret_sauce`)
    cy.get('[data-test="login-button"]').click()
    cy.get('.title').should(`have.text`, `Products`)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('#item_4_title_link > .inventory_item_name').invoke(`text`).then((text) => {
      const titleItem = text
      cy.wrap(titleItem).as (`titleItem`)
    })
    cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').invoke(`text`).then((text) => {
      const priceItem = text
      cy.wrap(priceItem).as (`priceItem`)
    })
    cy.get('.shopping_cart_link').click()
    cy.get('.title').should(`have.text`, `Your Cart`)
    cy.get('@titleItem').then(titleItem => {
      cy.get('.inventory_item_name').invoke(`text`).then((text) =>{
        expect(text).to.be.equals(titleItem)
      })
    })
    cy.get(`@priceItem`).then((priceItem) => {
      cy.get('.inventory_item_price').invoke(`text`).then((text) => {
        expect(text).to.be.equals(priceItem)
      })
    })
    cy.get('[data-test="checkout"]').click()
    cy.get('.title').should(`have.text`, `Checkout: Your Information`)
  })
  it('Checkout item without input first name in personal data', () => {
    cy.get('[data-test="lastName"]').type(`last name`)
    cy.get('[data-test="postalCode"]').type(`postal code`)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should(`have.text`, `Error: First Name is required`)
  })
  it('Checkout item without input last name in personal data', () => {
    cy.get('[data-test="firstName"]').type(`first name`)
    cy.get('[data-test="postalCode"]').type(`postal code`)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should(`have.text`, `Error: Last Name is required`)
  })
  it('Checkout item without input postal code in personal data', () => {
    cy.get('[data-test="firstName"]').type(`first name`)
    cy.get('[data-test="lastName"]').type(`last name`)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should(`have.text`, `Error: Postal Code is required`)
  })
})