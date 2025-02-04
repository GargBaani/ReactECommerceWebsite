import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import styled from 'styled-components';

const Contact = () => {
  const {isAuthenticated,user}=useAuth0()
  return (
   <Wrapper>
    <h2 className="common-heading">Contact Page</h2>
    <iframe title="frf"src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110335.77919744828!2d74.87628536199738!3d30.208744385004085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39173297173abbcd%3A0xa00033c0a58a5ac8!2sBathinda%2C%20Punjab!5e0!3m2!1sen!2sin!4v1721580909232!5m2!1sen!2sin" width="100%" height="400" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <div className='container'>
      <div className='contact-form'>
        <form method='POST' className='contact-inputs' action="https://formspree.io/f/xvgpzgne">
          <input type='text' placeholder='Username' required name='Username' autoComplete="off"  value={isAuthenticated ?user.name:""}></input>
          <input type="email" name="Email" placeholder="Email" value={isAuthenticated ?user.email:""}autoComplete="off"  required />
          <textarea name="Message"  cols="30" rows="10"required autoComplete="off"  placeholder="Enter you message"></textarea>
          <input type="submit" value="send" />
        </form>
      </div>

    </div>
   </Wrapper>
  )
}

const Wrapper = styled.section`
padding: 9rem 0 5rem 0;
text-align: center;

.container {
  margin-top: 6rem;

  .contact-form {
    max-width: 50rem;
    margin: auto;

    .contact-inputs {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      input[type="submit"] {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.white};
          border: 1px solid ${({ theme }) => theme.colors.btn};
          color: ${({ theme }) => theme.colors.btn};
          transform: scale(0.9);
        }
      }
    }
  }
}
`;

export default Contact