import React from 'react';
import { IItem } from '@components/InstructionList/Item';
import InstructionList from '@components/InstructionList';
import Form from './Form';
import styles from './styles.module.scss';

const items: IItem[] = [
  {
    number: 1,
    content: (
      <span>
        Open the{' '}
        <a
          className={styles['item-link']}
          href="https://console.aws.amazon.com/iam/home"
          rel="noopener noreferrer"
          target="_blank"
        >
          IAM console
        </a>
        .
      </span>
    ),
  },
  {
    number: 2,
    content: <span>From the navigation menu, click Users.</span>,
  },
  {
    number: 3,
    content: <span>Select your IAM user name.</span>,
  },
  {
    number: 4,
    content: <span>Click User Actions, and then click Manage Access Keys. </span>,
  },
  {
    number: 5,
    content: <span>Click Create Access Key.</span>,
  },
  {
    number: 6,
    content: (
      <div>
        Your keys will look something like this:
        <div className={styles.example}>
          <div>Access key ID example: AKIAIOSFODNN7EXAMPLE</div>
          <div>Secret access key example: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY</div>
        </div>
      </div>
    ),
  },
  {
    number: 7,
    content: <span>Click Download Credentials, and store the keys in a secure location.</span>,
  },
];

const AWSCredentionals = () => {
  return (
    <>
      <div className={styles.container}>
      <InstructionList title="Please follow the instructions below" items={items} />
      </div>
      <Form />
    </>
  );
};

export default AWSCredentionals;
