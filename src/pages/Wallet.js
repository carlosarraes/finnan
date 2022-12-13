import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <main className="flex items-center h-screen flex-col">
        <section className="w-8/12">
          <Header />
          <WalletForm />
          <Table />
        </section>
      </main>
    );
  }
}

export default Wallet;
