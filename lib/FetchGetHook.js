const FetchGetHook = async (url, setFunction) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setFunction(data.data.data.result);
    });
};


export const FetchGetHook2 = async (url, setFunction) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setFunction(data.data.data.result.filter((item)=>item?.role !== "resaller"));
    });
};

export const FetchGetHook3 = async (url, setFunction,setLoading) => {
  setLoading(true)
  fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => {
      setFunction(data.data.data.result.filter((item)=>item?.role === "resaller"));
      setLoading(false)
    });
};

export const FetchHistory= async (url, setFunction) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setFunction(data?.data);
    });
};


export default FetchGetHook;
