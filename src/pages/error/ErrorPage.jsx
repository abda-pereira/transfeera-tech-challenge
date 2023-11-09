import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ErrorContainer = styled.div`
  height: 100vh;
`;

const ErrorPage = () => {
  return (
    <ErrorContainer className='flex fd-fc ai-fc jc-fc'>
      <h1 className='f700-90 mb-10'>404</h1>
      <p className='fn-24 mb-40'>Desculpe, página não encontrada!</p>
      <Link to='/'>
        <button className='btn btn-secondary'>Voltar para o início</button>
      </Link>
    </ErrorContainer>
  );
};

export default ErrorPage;
