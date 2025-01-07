document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('content');
  const loadingBar = document.getElementById('loading-bar');
  document.characterSet = "UTF-8";

  document.body.addEventListener('click', async (e) => {
    if (e.target.tagName === 'A' && e.target.origin === window.location.origin) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      await navigateTo(href);
    }
  });

  async function navigateTo(url) {
    history.pushState(null, '', url);
    
    loadingBar.style.width = '100%';

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json, text/html'
        }
      });

      if (!response.ok) throw new Error('Page loading failed');

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        contentContainer.innerHTML = data.content;
        document.title = decodeURIComponent(escape(data.title));
      } else {
        const htmlContent = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const newContent = doc.getElementById('content');
        if (newContent) {
          contentContainer.innerHTML = newContent.innerHTML;
          document.title = decodeURIComponent(escape(doc.title));
        } else {
          contentContainer.innerHTML = htmlContent;
        }
      }

    } catch (error) {
      console.error('Navigation Error:', error);
    } finally {
      loadingBar.style.width = '0';
    }
  }

  window.addEventListener('popstate', (event) => {
    navigateTo(window.location.pathname);
  });
});
