describe('As a user I want to receive complete list of episodes', () => {
  it('receives a complete list of episodes by country', () => {
    const country = {
      code: "DE",
      name: "Germany"
    };
    cy.request({
      method: 'GET',
      url: `https://api.tvmaze.com/schedule/?country=${country.code}`,
    }).then( ({ body, status }) => {
      expect(status).to.eq(200);
      cy.wrap(body).each((episode) => {
        expect(episode.show.network.country.code).to.contain(country.code);
        expect(episode.show.network.country.name).to.contain(country.name);
      });
    })
  });

  it('checks handling incorrect country code', () => {
    const incorrectCode = "QQ";
    cy.request({
      method: 'GET',
      url: `https://api.tvmaze.com/schedule/?country=${incorrectCode}`,
      failOnStatusCode: false
    }).then( ({ body, status }) => {
      expect(status).to.eq(422);
      expect(body.message).to.eq("Not a valid ISO country code");
      expect(body.status).to.eq(422);
    })
  });

  it('receives a complete list of episodes by date', () => {
    const date = "2023-02-13";
    cy.request({
      method: 'GET',
      url: `https://api.tvmaze.com/schedule/?date=${date}`,
    }).then( ({ body, status }) => {
      expect(status).to.eq(200);
      cy.wrap(body).each((episode) => {
        expect(episode.airdate).to.contain(date);
      });
    })
  });

  it('checks handling incorrect date format', () => {
    const incorrectDate = "11-02-2022";
    cy.request({
      method: 'GET',
      url: `https://api.tvmaze.com/schedule/?date=${incorrectDate}`,
      failOnStatusCode: false
    }).then( ({ body, status }) => {
      expect(status).to.eq(422);
      expect(body.message).to.eq("Not a valid ISO date");
      expect(body.status).to.eq(422);
    })
  });
});
