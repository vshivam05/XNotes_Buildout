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