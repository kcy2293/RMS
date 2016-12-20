import { RMSPage } from './app.po';

describe('rms App', function() {
  let page: RMSPage;

  beforeEach(() => {
    page = new RMSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
