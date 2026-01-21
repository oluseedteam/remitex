const transferAPI = {
  async getRoutes(token) {
    const response = await fetch(
      'https://api-remitex.wetfieldinc.com/api/transfer-routes',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch routes`);
    }

    return response.json();
  },

  async createTransfer(data, token) {
    const response = await fetch(
      'https://api-remitex.wetfieldinc.com/api/transfers/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || 'Transfer failed');
    }

    return result;
  },
};

export default transferAPI;
