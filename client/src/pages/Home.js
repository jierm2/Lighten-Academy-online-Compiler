import React from 'react';
import '../ResponsePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { TypeAnimation } from 'react-type-animation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Home() {
  const underlineStyle = {
    textDecoration: 'underline' 
  };
  return (
    <section id="about">
      <NavBar />
      <div className="container mx-auto flex px-10 py-20 mt-20 md:flex-row flex-col items-center h-[400px]">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-center mb-16 md:mb-0 items-center text-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="title-font sm:text-5xl text-4xl mb-6 font-medium text-black">
              Code with  <TypeAnimation
                sequence={[
                  'Pymeow',
                  1000,
                ]}
                wrapper="span"
                speed={300}
                style={underlineStyle}
                repeat={Infinity}
              />
              <br className="hidden lg:inline-block" />
              Where Coding Meets Fun!
            </h1>
            <p className="mb-8 leading-relaxed text-lg">
              Pymeow transforms Python programming into a delightful adventure. We create a captivating environment where kids can play, explore, and learn Python at their own pace. Let's make coding your new favorite hobby!
            </p>
            <div className="flex justify-center">
              <a
                href="/playground"
                className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Playground
              </a>
              <a
                href="/exercise"
                className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
              >
                Exercise
              </a>
            </div>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <LazyLoadImage
            effect="blur"
            className="object-cover object-center rounded h-full"
            alt="hero"
            src="/stock-vector-simple-cat-coding-laptop-tech-software-engineer-design-vector-illustration-2269043357-transformed-removebg-preview.png"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
