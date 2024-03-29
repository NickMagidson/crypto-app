import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]); // Gives us access to all the coins
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]); // useEffect will be used whenever these 2 values change

  if (isFetching) return <Loader />;


  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-contianer'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} alt="crypto icon"/>}
                hoverable
                >
                <p>Price: {millify(currency.price)}</p>
                <p>Price: {millify(currency.marketCap)}</p>
                <p>Price: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies