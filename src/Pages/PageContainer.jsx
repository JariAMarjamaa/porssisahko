import SecondPage  from './2Page.tsx';
import ThirdPage   from './3Page.jsx';
import FourthPage  from './4Page.jsx';
import FifthPage   from './5Page.jsx';
import SixthPage   from './6Page.jsx';


function PageContainer({pageNumber}) {
  
    return (
        <div className="pageContainer">
 
            {pageNumber === 2 ? 
                <div> <SecondPage /> </div>
            :pageNumber === 3 ? 
                <div> <ThirdPage /> </div>
            :pageNumber === 4 ? 
                <div> <FourthPage /> </div>
            :pageNumber === 5 ? 
                <div> <FifthPage /> </div>
            :pageNumber === 6 && 
                <div> <SixthPage /> </div>
            }
      </div>
    );
  }
  
  export default PageContainer;