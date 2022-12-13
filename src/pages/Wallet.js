import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <main className="flex items-center h-screen flex-col">
        <section className="w-10/12">
          <Header />
          <WalletForm />
          <Table />
          <Footer />
        </section>
      </main>
    );
  }
}

export default Wallet;
