// ---------------- FRONTEND TESTS ----------------
import "cypress-real-events/support";
import dotenv from 'dotenv';
dotenv.config();

describe('Notes App Frontend Tests', () => {
  let name = `Test-User_${Date.now()}`;
  let email = `test-user_${Date.now()}@gmail.com`;
  let password = "12345678";

  // Helper function to log in
  function login(email, password) {
    cy.contains('Login').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/notes');
  }

  // Register the user once before all tests
  before(() => {
    cy.visit('/');
    cy.contains('Register').click();

    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/notes');
    cy.contains(`Hi, ${name}`).should('be.visible');
    cy.contains('Logout').click(); // Reset to logged-out state
  });

  context('Public Pages', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Should display Notes App at the top-left corner of the Navbar', () => {
      cy.get('nav').within(() => {
        cy.contains('Notes App').should('be.visible');
      });
    });

    it('Should have "Login", "Register" and "Mode Change" buttons in the Navbar', () => {
      cy.get('nav').within(() => {
        cy.contains('Login').should('be.visible');
        cy.contains('Register').should('be.visible');
        cy.get('button').should('be.visible'); // Mode change button
      });
    });

    it('User should be able to log in through the UI', () => {
      login(email, password);
      cy.contains(`Hi, ${name}`).should('be.visible');
      cy.contains('Logout').should('be.visible');
    });
  });

  context('Logged-in Features', () => {
    beforeEach(() => {
      cy.visit('/');
      login(email, password);
    });

    it('Should display "My Notes" section on the homepage', () => {
      cy.contains('My Notes').should('be.visible');
    });

    it('Should have "Search notes..." input option and it allows typing', () => {
      cy.get('input[placeholder="Search notes..."]').should('exist').and('be.visible');
      cy.get('input[placeholder="Search notes..."]').type('React').should('have.value', 'React');
    });

    it('User should be able to create a note', () => {
      cy.get('input[name="title"]').type("Test Note by Crio.Do");
      cy.get('textarea[name="content"]').type("This is a Test Note by Crio.Do.");
      cy.contains('Create Note').click();
      cy.contains("Test Note by Crio.Do").should('be.visible');
    });

    it('User should be able to pin and unpin a note', () => {
      cy.contains('Pin').click();
      cy.contains('Unpin').should('be.visible');
      cy.contains('Unpin').click();
      cy.contains('Pin').should('be.visible');
    });

    it('User should be able to view/edit a note', () => {
      cy.contains("Test Note by Crio.Do").should('be.visible');
      cy.contains('View/Edit').click();
      cy.get('.modal').should('be.visible');
      cy.contains('Edit').should('be.visible');
      cy.contains('Close').should('be.visible');
    });

    it('User should be able to delete a note', () => {
      cy.contains("Test Note by Crio.Do").should('be.visible');
      cy.contains('Delete').click();
      cy.contains("No notes available").should('be.visible');
    });
  });
});

// ---------------- BACKEND API TESTS ----------------
describe('Notes App Backend Tests', () => {
    let name = `Test-User_${Date.now()}`;
    let email = `test-user_${Date.now()}@gmail.com`;
    const password = "12345678";
    let token;
    let temp_email = email;
    let note_id;
    let total_notes;
  
    it('User should be able to Signup using his details', () => {
        cy.backendRequest({
          method: "POST",
          url: "/api/auth/register",
          body:  { "name" : `${name}`, "email" : `${email}`,  "password" : `${password}`},
        })
        .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${email}`);
        expect(response.body.message).to.eq("User registered successfully");
        expect(response.body.token).to.not.be.empty;
      });
    });

    it('User should be able to Login using his email and password', () => {
      cy.backendRequest({
        method : 'POST', 
        url : `/api/auth/login`,
        body : { "email" : `${temp_email}`,  "password" : `${password}`}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${temp_email}`);
        expect(response.body.message).to.eq("Login successful");
        expect(response.body.token).to.not.be.empty;
        token = response.body.token;
      });
    });

    it('User should be able to Create a Note', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/notes`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "test note 1",
          content: "test note 1 content"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title).to.eq("test note 1");
        expect(response.body.content).to.eq("test note 1 content");
        expect(response.body.pinned).to.eq(false);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        note_id = response.body._id;
      });
    });

    it('User should be able to Update an existing Note', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/notes/${note_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "updated test note 1"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("updated test note 1");
        expect(response.body.content).to.eq("test note 1 content");
        expect(response.body.pinned).to.eq(false);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        note_id = response.body._id;
      });
    });

    it('User should be able to Pin an existing Note', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/notes/${note_id}/pin`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("updated test note 1");
        expect(response.body.content).to.eq("test note 1 content");
        expect(response.body.pinned).to.eq(true);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
      });
    });

    it('User should be able to Unpin a pinned Note', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/notes/${note_id}/pin`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("updated test note 1");
        expect(response.body.content).to.eq("test note 1 content");
        expect(response.body.pinned).to.eq(false);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
      });
    });

    it('User should be able to get all Notes', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/notes`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        total_notes = response.body.length;
      });
    });

    it('User should be able to delete a Note', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/notes`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "test note 2",
          content: "test note 2 content"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body._id).to.not.be.empty;
      });

      cy.backendRequest({
        method : 'DELETE',
        url: `/api/notes/${note_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Note deleted successfully");
      });

      cy.backendRequest({
        method: 'GET',
        url: `/api/notes`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(total_notes);
      });
    });

});
