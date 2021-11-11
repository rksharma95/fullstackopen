describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',
      { username:'testUser', name:'testName', password:'testPass' }
    )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.request('POST', 'http://localhost:3003/api/login',
        { username:'testUser', password: 'testPass' }
      ).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
      cy.contains('testName logged in')
    })

    it('fails with wrond credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrongPass')
      cy.get('#btn-login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in',function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login',
        { username: 'testUser', password: 'testPass' }
      ).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.request({
        method:'POST',
        url:'http://localhost:3003/api/blogs',
        body:{ title:'a new blog', author:'testUser', url:'anyurl.com' },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
        }
      }
      )

      cy.visit('http://localhost:3000')
      cy.contains('a new blog')
    })

    describe('when a blog is added', function() {
      beforeEach(function(){
        cy.createBlog(
          {
            title:'a new blog',
            author:'testUser',
            url:'anyurl.com'
          }
        )
      })

      // it('user can like a post', function(){
      //   cy.get('.btn-view').click()
      //   cy.get('.btn-like').click()
      // })
      it('user who own the post can delete it', function() {
        cy.get('.btn-view').click()
        cy.get('.btn-remove').click()
        cy.on('window.confirm', () => true)
      })
    })
  })

  describe('the blogs are in sorted order of likes', function () {
    beforeEach(function() {
      cy.login({ username:'testUser', password:'testPass' })
      cy.createBlog({
        title:'blog with minimum likes',
        author:'a',
        url:'a.com',
        likes:10
      })
      cy.createBlog({
        title:'blog with median likes',
        author:'a',
        url:'a.com',
        likes:15
      })
      cy.createBlog({
        title:'blog with maximum likes',
        author:'a',
        url:'a.com',
        likes:20
      })
    })

    it('blog with max likes is at top', function(){
      cy.get('.btn-view').first().click()
      cy.get('.like').parent().as('likeBlock')
      cy.get('@likeBlock').contains(20)
    })
  })
})


