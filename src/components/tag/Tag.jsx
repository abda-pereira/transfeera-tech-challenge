import './Tag.scss';
import utils from '../../utils/formatters';

const Tag = ({name = '', className = ''}) => {
  return (
    <div className={`flex ai-fc jc-fc tag ${className}`}>
        {utils.capitalFirstChar(name)}
    </div>
  )
}

export default Tag