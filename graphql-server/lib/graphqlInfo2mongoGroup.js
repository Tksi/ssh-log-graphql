import graphqlFields from 'graphql-fields';

// ruleは$first以外のグループの定義のみでok
export const graphqlInfo2mongoGroup = ({ info, rule = {}, initGroup = {} }) => {
  const queryFields = graphqlFields(info);

  Object.keys(queryFields).forEach((queryField) => {
    // デフォルト値は、クエリフィールドの$first
    const def = Object.keys(initGroup).includes(queryField)
      ? undefined
      : {
          [queryField]: { $first: `$${queryField}` },
        };

    initGroup = {
      ...initGroup,
      ...(rule[queryField] ?? def),
    };
  });

  return initGroup;
};
