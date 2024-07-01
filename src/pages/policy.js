import { useEffect } from 'react';

const Policy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='flex flex-col justify-center items-center pt-28 lg:pt-60 px-12 lg:px-28 xl:px-44 gap-2'>
      <h1 className='text-3xl lg:text-9xl'>Privacy Policy</h1>
      <p className='text-xl font-sfui'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
        lacinia lacus, in luctus est dignissim vel. Nunc posuere ipsum in lorem
        tincidunt varius. Proin eu sapien sit amet dolor tincidunt auctor. Donec
        sagittis elit ut rhoncus tempor. Donec eu ornare felis, non bibendum
        nunc. Proin volutpat elementum tortor sit amet feugiat. Mauris finibus
        rhoncus mi, nec pellentesque velit. Nunc elit nunc, hendrerit
        scelerisque scelerisque eu, sodales quis dui. Nulla mattis ut odio at
        euismod. Aenean mattis enim urna, sed ornare sem molestie in. Etiam
        scelerisque nisi vel purus lobortis placerat. Vestibulum rhoncus ante in
        sapien sodales ullamcorper. Proin a euismod erat, non blandit nisi.
      </p>
      <p className='text-xl font-sfui'>
        Quisque et congue enim, convallis pellentesque nisl. Praesent massa
        elit, rutrum eu enim non, faucibus rhoncus leo. Mauris viverra diam et
        nunc eleifend semper. Donec convallis interdum porta. Pellentesque
        molestie, risus posuere aliquet convallis, risus est dapibus sapien,
        molestie lobortis ligula neque sed ante. Fusce a vehicula lorem. Nulla
        eu iaculis quam, et posuere erat. Nullam dapibus nunc mauris, in cursus
        ante condimentum at. Mauris venenatis quam et erat ornare, at sodales
        orci cursus. Nulla at varius sem. Fusce sed pretium diam. Aliquam nec
        commodo ante. Nam euismod et massa eget vulputate.
      </p>
      <p className='text-xl font-sfui'>
        Mauris laoreet lacus non velit consequat rhoncus. Mauris scelerisque
        scelerisque augue ac placerat. Nam bibendum massa eu congue condimentum.
        Mauris ut interdum enim. Suspendisse in dui molestie, vulputate augue
        vel, cursus nunc. Aenean fringilla massa sed purus accumsan, nec maximus
        orci molestie. In pretium vitae purus vel lacinia. Quisque ornare
        lobortis urna, id lacinia dolor condimentum id. Mauris cursus aliquet
        molestie. Donec sagittis feugiat sagittis. Morbi quam turpis, vulputate
        eu quam ac, vestibulum tincidunt eros. Aenean nec fermentum arcu.
        Phasellus tempor malesuada porta. Curabitur tristique diam id posuere
        convallis.
      </p>
    </div>
  );
};

export default Policy;
