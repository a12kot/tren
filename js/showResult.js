
export default function showResult(target_El, content){
    localStorage.setItem(+new Date, content);   
    (function drawOnLoad() {
        for (let i = 0; i < localStorage.length; i++) { 
            let data = localStorage.key(i);
            let item_time = new Date(+data);
            // alert(localStorage.getItem(lk_key));
            target_El.insertAdjacentHTML('beforeend', 
            `<th>${item_time.getDate()} /${item_time.getMonth()}  ${item_time.getHours()} : ${item_time.getMinutes()} </th>
            <th> ${localStorage.getItem(data)}</th>
            `);
        }
    })();
}
