import p1 from '@/assets/images/pp-1.jpg';
import p2 from '@/assets/images/pp-2.jpg';
import p3 from '@/assets/images/pp-3.jpg';
import p4 from '@/assets/images/pp-4.jpg';
import p5 from '@/assets/images/pp-5.jpg';

export const useTableData = () => {
  const DUMMY_DATA = useState('tableDummyData');
  const TABLE_DUMMY_DATA = useState('staleData')

  //  SORTING
  const sortDataByField = (cb) => {
    DUMMY_DATA.value.sort(cb);
  };

  const sortByText = (order, field) => {
    const [key, nestedKey] = field.split('.');

    switch (order) {
      case 'asc':
        sortDataByField((a, b) =>
          a[key][nestedKey].localeCompare(b[key][nestedKey])
        );
        break;
      case 'desc':
        sortDataByField((a, b) =>
          b[key][nestedKey].localeCompare(a[key][nestedKey])
        );
        break;
    }
  };

  const sortByNumOrDate = (order, field) => {
    switch (order) {
      case 'asc':
        sortDataByField((a, b) => a[field] - b[field]);
        break;
      case 'desc':
        sortDataByField((a, b) => b[field] - a[field]);
        break;
    }
  };

  // FILTERING
  const filterDataByField = (cb) => {
    DUMMY_DATA.value = TABLE_DUMMY_DATA.filter(cb);
  };

  const filterDataByText = (keyword, operator, field) => {
    const nestedKeys = field.split('.');

    filterDataByField((item) => {
      let fieldValue = item;
      // Traverse the nested keys to access the final value
      for (const key of nestedKeys) {
        if (fieldValue && fieldValue.hasOwnProperty(key)) {
          fieldValue = fieldValue[key];
        } else {
          fieldValue = undefined;
          break;
        }
      }

      // Perform the filtering based on the operator and keyword
      switch (operator) {
        case 'is':
          return (
            fieldValue &&
            fieldValue.toLowerCase().includes(keyword.toLowerCase())
          );
        case 'is-not':
          return (
            !fieldValue ||
            !fieldValue.toLowerCase().includes(keyword.toLowerCase())
          );
        default:
          return true; // No operator specified, return all data
      }
    });
  };


  const filterDataByNum = (inputNum, operator, field) => {
    switch (operator) {
      case 'eq':
        filterDataByField((item) => item[field] === inputNum);
        break;
      case 'nt-eq':
        filterDataByField((item) => item[field] !== inputNum);
        break;
      case 'lt':
        filterDataByField((item) => item[field] < inputNum);
        break;
      case 'gt':
        filterDataByField((item) => item[field] > inputNum);
        break;
      case 'le':
        filterDataByField((item) => item[field] <= inputNum);
        break;
      case 'ge':
        filterDataByField((item) => item[field] >= inputNum);
        break;
    }
  };

  const filterDataByDate = (targetDate, operator, field) => {
    switch (operator) {
      case 'is':
        filterDataByField(
          (item) => item[field].getTime() === new Date(targetDate).getTime()
        );
        break;
      case 'is-before':
        filterDataByField(
          (item) => item[field].getTime() < new Date(targetDate).getTime()
        );
        break;
      case 'is-after':
        filterDataByField(
          (item) => item[field].getTime() > new Date(targetDate).getTime()
        );
        break;
      case 'is-on-before':
        filterDataByField(
          (item) => item[field].getTime() <= new Date(targetDate).getTime()
        );
        break;
      case 'is-on-after':
        filterDataByField(
          (item) => item[field].getTime() >= new Date(targetDate).getTime()
        );
        break;
    }
  };

  const resetFilterFields = () => {
    DUMMY_DATA.value = TABLE_DUMMY_DATA.value;
  };


  return {
    DUMMY_DATA,
    sortByText,
    sortByNumOrDate,
    filterDataByText,
    filterDataByNum,
    filterDataByDate,
    resetFilterFields,
  };
};

export const useCandidate = () => {
  const currCandidate = useState('candidate', () => { });

  const getCurrentCandInfo = (info) => {
    currCandidate.value = info;
  };

  return { currCandidate, getCurrentCandInfo };
};

export const useHideDropDown = () => {
  const tableTdVisible = useState('tableTdVisible', () => {
    const isVisible = {
      isRatingVisible: true,
      isStagesVisible: true,
      isTeamVisible: true,
      isDateVisible: true,
      isOwnerVisible: true,
      isAgeVisible: true
    };

    return isVisible;
  });

  const tdToggle = (state) => {
    tableTdVisible.value.isRatingVisible = state;
    tableTdVisible.value.isStagesVisible = state;
    tableTdVisible.value.isTeamVisible = state;
    tableTdVisible.value.isDateVisible = state;
    tableTdVisible.value.isOwnerVisible = state;
  };

  const showAllTableTd = () => {
    tdToggle(true);
  };

  const hideAllTableTd = () => {
    tdToggle(false);
  };

  return { tableTdVisible, showAllTableTd, hideAllTableTd };
};

export async function fetchCandidate(accessToken) {
  const res = await fetch(`https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/${useRuntimeConfig().public.appId}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      query: `query {\n
          users{\n
            _id
            appliedDate\n
            email\n
            stage {\n
              state\n
              value\n
            }\n
            team {\n
              self\n
              team\n
            }\n
            name\n
            owner {\n
              name\n
            }\n
            rating\n
            userId\n
          }
      }`
    })
  })
  const data=await res.json()
  console.log(data)
  const DUMMY_DATA=useState('tableDummyData')
  const TABLE_DUMMY_DATA=useState('staleData')
  DUMMY_DATA.value=data.data.users
  TABLE_DUMMY_DATA.value=data.data.users
}