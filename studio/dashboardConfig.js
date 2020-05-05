export default {
  widgets: [

    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5eb072c20b55864f8a9a9008',
                  title: 'Sanity Studio',
                  name: 'sanity-eleventy-blog-studio-ufxnjfbx',
                  apiId: '7eceaad2-9a8b-42b3-87e7-f1dc3d304868'
                },
                {
                  buildHookId: '5eb072c20958627dca25c2fe',
                  title: 'Blog Website',
                  name: 'sanity-eleventy-blog-web-et3v7ghm',
                  apiId: 'da17f325-c57b-43e5-b145-32490ea65e9f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/g12n/sanity-eleventy-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-eleventy-blog-web-et3v7ghm.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    },
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-eleventy-blog'
      }
    }
  ]
}
