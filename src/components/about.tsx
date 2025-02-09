export default function About() {
  return (
    <footer className="fixed-bottom bg-body-tertiary py-3 text-secondary">
      <div className="container text-center">
        <div className="mb-2">
          <strong>About infoharvest:</strong> infoharvest is an open-source browser extension that allows you to
          customize your new tab page with your favorite URL.
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <a
              className="link-opacity-75 link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
              href="https://github.com/dafengzhen/infoharvest"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub Repository
            </a>
          </div>
          <div className="col-auto">
            <a
              className="link-opacity-75 link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
              href="https://github.com/dafengzhen/infoharvest-extension"
              rel="noopener noreferrer"
              target="_blank"
            >
              Chrome Extension Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );

  // return (
  //   <div className="mt-4 pt-3 border-top text-center text-secondary">
  //     <h6>About infoharvest</h6>
  //     <p>
  //       infoharvest is an open-source browser extension that allows you to customize your new tab page with your
  //       favorite URL.
  //     </p>
  //     <a
  //       className="link-opacity-75 link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
  //       href="https://github.com/dafengzhen/infoharvest"
  //       rel="noopener noreferrer"
  //       target="_blank"
  //     >
  //       GitHub Repository
  //     </a>
  //   </div>
  // );
}
