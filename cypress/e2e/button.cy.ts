/* eslint-env cypress */
describe('MyButton in Storybook', () => {
  beforeEach(() => {
    // 访问 Button 在 Storybook 中的 Primary story
    // URL 结构可能是 /iframe.html?id=components-mybutton--primary&viewMode=story
    // 请根据你的 Storybook URL 调整
    cy.visit('/iframe.html?id=components-mybutton--primary&viewMode=story');
  });

  it('should display the button with correct text', () => {
    cy.get('.my-button').should('be.visible').and('contain.text', 'Click Me');
  });

  it('should change background on hover (visual test or check class if applicable)', () => {
    // Cypress 不擅长直接测试 :hover 状态的样式，但可以触发 hover
    // cy.get('.my-button').trigger('mouseover');
    // 如果 hover 改变了 class 或者有其他 DOM 变化，可以断言
    // 或者结合 Percy / Applitools 进行视觉回归测试
  });
});
