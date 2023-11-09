import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiSolidPlusCircle } from 'react-icons/bi';
import Search from '../../../components/search/Search';

const ReceiversHeaderContainer = styled.div`
    background-color: #ECEFF1;
    height: 122px;
    padding: 0 45px;

    .titleContainer {
        gap: 3px;

        h1 {
            color: #757575;
            line-height: 40px;
        }
    
        svg {
            color: #1FBFAE;
            width: 41px;
            height: 41px;
        }
    }

    @media screen and (max-width: 600px) {
        flex-direction: column;
        gap: 10px;
        align-items: normal;
        justify-content: center;

        .search-receivers {
            width: 100%;
        }
    }

    @media screen and (max-width: 317px) {
        .titleContainer {
            h1 {
                font-size: 18px;
            }
        }
    }
`

const ReceiversHeader = ({onSearch}) => {
  return (
    <ReceiversHeaderContainer className='flex ai-fc jc-sb'>
        <div className='titleContainer flex'>
            <h1 className='f300-28'>Seus favorecidos</h1>
            <Link to='/receiver' data-testid='btn-createrec'>
                <BiSolidPlusCircle/>
            </Link>
        </div>
        <Search className='search-rec' txtPlaceholder='Nome, CPF, agência ou conta' onSearch={onSearch}/>
    </ReceiversHeaderContainer>
  )
}

export default ReceiversHeader;