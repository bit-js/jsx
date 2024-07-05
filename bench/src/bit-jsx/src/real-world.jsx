import { escapeHTML } from '@bit-js/web-utils';

const purchases = Array.from({ length: 1000 }, (_, i) => ({
  name: `Item ${i + 1}`,
  price: i * 2,
  quantity: i * 5
}));

function Purchase(props) {
  return (
    <div class="purchase purchase-card">
      <div class="purchase-name">{escapeHTML(props.name)}</div>
      <div class="purchase-price">{props.price}</div>
      <div class="purchase-quantity">{props.quantity}</div>
    </div>
  );
}

function Layout(props) {
  return (
    <html lang="en">
      <head>{props.head}</head>
      <body>{props.children}</body>
    </html>
  );
}

export function Head(props) {
  return (
    <div>
      <title>{escapeHTML(props.title)}</title>
      <meta name="description" content="A description" />
      <meta name="keywords" content="some, keywords" />
      <meta name="author" content="Some Author" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="styles.css" />
      <script src="script.js"></script>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@site" />
      <meta name="twitter:title" content="Title" />
      <meta name="twitter:description" content="A description" />
      <meta name="twitter:creator" content="@creator" />
      <meta name="twitter:image" content="image.jpg" />
      <meta content="Title" />
      <meta content="website" />
      <script src="https://cdn.jsdelivr.net/npm/axios-cache-interceptor@1/dev/index.bundle.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/axios-cache-interceptor@1/dist/index.bundle.js"></script>
    </div>
  );
}

function Header(props) {
  return (
    <header class="header">
      <h1 class="header-title">
        Hello {escapeHTML(props.name)}
      </h1>
      <nav class="header-nav">
        <ul class="header-ul">
          <li class="header-item">
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer(props) {
  return (
    <footer class="footer">
      <p class="footer-year">
        © {new Date().getFullYear()} {escapeHTML(props.name)}
      </p>

      <p class="footer">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </p>
    </footer>
  );
}

function Main(props) {
  return (
    <div>
      <Header name={props.name} />
      <main class="main-content">{props.children}</main>
      <Footer name={props.name} />
    </div>
  );
}

function UserProfile(props) {
  return (
    <section class="user-profile">
      <h2 class="user-profile title">User Profile</h2>
      <p class="user-profile name">
        Name: {escapeHTML(props.name)}
      </p>
      <p class="user-profile info">Email: example@example.com</p>
      <p class="user-profile info">Address: 123 Main St, City, Country</p>
      <p class="user-profile info">Phone: 123-456-7890</p>
    </section>
  );
}

function Sidebar() {
  return (
    <aside class="sidebar">
      <h2 class="purchase title">Recent Purchases</h2>
      <ul class="purchase list">
        {purchases.slice(0, 3).map((purchase) => (
          <li class="purchase-preview">
            {escapeHTML(purchase.name)} - {purchase.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function PageContent() {
  return (
    <div class="page-content">
      <h2 class="title mb-4 h2">Welcome to our store</h2>
      <p class="p text mb-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis magna id
        dolor ultricies, eget pretium ligula sodales. Cras sit amet turpis nec lacus
        blandit placerat. Sed vestibulum est sit amet enim ultrices rutrum. Vivamus in
        nulla vel nunc interdum vehicula.
      </p>
      <p class="p text mb-0">
        Pellentesque efficitur tellus id velit vehicula laoreet. Proin et neque ac dolor
        hendrerit elementum. Fusce auctor metus non ligula tincidunt, id gravida odio
        sollicitudin.
      </p>
    </div>
  );
}

export default function Page(name) {
  return (
    <Layout head={<Head title="Real World Example" />}>
      <Main name={name}>
        <h2>Purchases</h2>

        <div class="purchases">
          {purchases.map(Purchase)}
        </div>

        <UserProfile name={name} />
        <Sidebar />
        <PageContent />
      </Main>
    </Layout>
  );
}

console.log(Page('Hi').length);
