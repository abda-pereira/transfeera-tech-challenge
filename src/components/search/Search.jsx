import { useState } from 'react';
import styled from 'styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';

const SearchContainer = styled.div`
    position: relative;
    width: 254px;

    input {
        background: #FFF;
        border-radius: 4px;
        height: 31px;
        border: none;
        padding: 0 42px 0 5px;
        width: 100%;
    }

    ::-webkit-input-placeholder {
        color: #9DADBB;
    }

    ::-moz-placeholder {
        color: #9DADBB;
    }

    :-ms-input-placeholder { 
        color: #9DADBB;
    }

    :-moz-placeholder { 
        color: #9DADBB;
    }

    svg {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 10px;
        top: 6px;
        color: #697680;
    }
`

const Search = ({ txtPlaceholder='Buscar', onSearch, className = '' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
        }
    }

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <SearchContainer className={className}>
        <input 
            placeholder={txtPlaceholder}
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
        />
        <BiSearchAlt2 className='pointer' onClick={handleSearch}/>
        </SearchContainer>
    )
}

export default Search;