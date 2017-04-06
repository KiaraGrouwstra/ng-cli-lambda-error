import { Crud2Page } from './app.po';

describe('crud2 App', () => {
  let page: Crud2Page;

  beforeEach(() => {
    page = new Crud2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
