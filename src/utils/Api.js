import { getEmailQuery, getUserQuery } from './getValidQuery';

class Api {
  static #port = 5001;
  static #rootURL = `http://localhost:${this.#port}/`;

  static async #getPromise(address) {
    const res = await fetch(`${address}`);
    if (!res.ok) {
      throw new Response('', {
        status: res.status,
        statusText: 'Page note found',
      });
    }

    return res.json();
  }

  static updateQuery = (url, body, method) => {
    fetch(this.#rootURL + url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

  static getNotes = async (userID) =>
    await this.#getPromise(this.#rootURL + `notes?userId=${userID}`);

  static deleteNote = (noteID) =>
    fetch(this.#rootURL + `notes/${noteID}`, {
      method: 'DELETE',
    });

  static getNote = async (noteID, user) =>
    await this.#getPromise(
      this.#rootURL + `notes?id=${noteID}&userId=${user.id}`
    );

  static updateNote = ({ id, noteTitle, noteBody }) => {
    Api.updateQuery(
      `notes/${id}`,
      {
        title: noteTitle,
        body: noteBody,
      },
      'PATCH'
    );
  };

  static addUser = async (user) => {
    Api.updateQuery(
      'users',
      {
        id: '',
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        registrationDate: user.registrationDate,
      },
      'POST'
    );
  };

  static checkUser = async (user) => {
    return this.#getPromise(
      this.#rootURL + `users?${getEmailQuery(user.email)}`
    ).then((data) => {
      if (data[0]?.id) {
        return true;
      } else {
        return false;
      }
    });
  };

  static getUser = async (user) => {
    return await this.#getPromise(
      this.#rootURL + `users?${await getUserQuery(user.email, user.password)}`
    ).then((users) => users[0]);
  };

  static addNote = async (note) => {
    Api.updateQuery(
      'notes',
      {
        id: note.id,
        userId: note.userId,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt,
      },
      'POST'
    );
  };
}

export { Api };
