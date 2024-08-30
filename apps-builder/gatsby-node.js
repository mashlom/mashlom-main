const path = require('path');
const fs = require('fs-extra');
const fastGlob = require('fast-glob');

const updateAssetPaths = async (filePath, pageName, isSubfolder = false) => {
  let content = await fs.readFile(filePath, 'utf8');
  if (isSubfolder) {
    // Count the number of directory levels from the current file to the page root
    const relativePath = path.relative(path.dirname(filePath), path.join(path.dirname(filePath), '..'));
    const levels = relativePath.split(path.sep).length;
    const prefix = '../'.repeat(levels);

    // Replace /static/ with the correct relative path
    content = content.replace(/(?<=["'])\/static\//g, `${prefix}static/`);
    // Adjust href attributes for subfolders
    content = content.replace(/href="\/([^"]+)"/g, (match, p1) => {
      const parts = p1.split('/');
      if (parts[0] === pageName) {
        parts.shift(); // Remove the page name if it's the same as the current page
      }
      return `href="${prefix}${parts.join('/')}"`;
    });
  } else {
    // For the main index file, replace /static/ with ./static/
    content = content.replace(/(?<=["'])\/static\//g, `./static/`);
    // Adjust href attributes for main index file
    content = content.replace(/href="\/([^"]+)"/g, (match, p1) => {
      const parts = p1.split('/');
      if (parts[0] === pageName) {
        return `href="./${parts.slice(1).join('/')}"`;
      }
      return `href="../${p1}"`;
    });
  }
  await fs.writeFile(filePath, content, 'utf8');
}

const copyAndUpdatePage = async (pageBuildPath, pageDestPath, pageName, reporter) => {
  await fs.copy(pageBuildPath, pageDestPath);
  reporter.info(`Copied ${pageName} to ${pageDestPath}`);

  // Update asset paths in HTML files
  const htmlFiles = await fastGlob(`${pageDestPath}/**/*.html`);
  for (const htmlFile of htmlFiles) {
    const isSubfolder = path.relative(pageDestPath, htmlFile).includes(path.sep);
    await updateAssetPaths(htmlFile, pageName, isSubfolder);
  }
  reporter.info(`Updated asset paths in HTML files for ${pageName}`);
}


exports.onPostBuild = async ({ store, reporter }) => {
  const { program } = store.getState();
  const outputPath = path.join(program.directory, 'public');
  const appsPath = path.join(program.directory, '..', 'apps', 'pediatric');
  const staticPath = path.join(outputPath, 'static');


  // Get all directories in the pages folder
  const pagesPath = path.join(program.directory, 'src', 'pages');
  const pages = fs.readdirSync(pagesPath).filter(
    file => fs.statSync(path.join(pagesPath, file)).isDirectory()
  );

  for (const page of pages) {
    const pageBuildPath = path.join(outputPath, page);
    const pageDestPath = path.join(appsPath, page);

    if (fs.existsSync(pageBuildPath)) {
      // Copy the built page to the apps/pediatric folder
      await copyAndUpdatePage(pageBuildPath, pageDestPath, page, reporter);


      // Copy static folder to the root of each page
      if (fs.existsSync(staticPath)) {
        const pageStaticDestPath = path.join(pageDestPath, 'static');
        await fs.copy(staticPath, pageStaticDestPath);
        reporter.info(`Copied static folder to ${pageStaticDestPath}`);
      } else {
        reporter.warn(`Static folder not found in ${outputPath}`);
      }
    } else {
      reporter.warn(`Build output for ${page} not found`);
    }
  }

  // Copy the 404 page to the root of apps/pediatric
  const notFoundSrcPath = path.join(outputPath, '404.html');
  const notFoundDestPath = path.join(appsPath, '404.html');
  if (fs.existsSync(notFoundSrcPath)) {
    await fs.copy(notFoundSrcPath, notFoundDestPath);
    reporter.info(`Copied 404 page to ${notFoundDestPath}`);
  }

  reporter.info('Build process completed');
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const pagesPath = path.join(__dirname, 'src', 'pages');
  const pages = fs.readdirSync(pagesPath).filter(
    file => fs.statSync(path.join(pagesPath, file)).isDirectory()
  );

  pages.forEach(page => {
    createPage({
      path: `/${page}`,
      component: path.resolve(`./src/pages/${page}/index.jsx`),
      context: {},
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@images': path.resolve(__dirname, 'src/images'),
      },
    },
  })
}