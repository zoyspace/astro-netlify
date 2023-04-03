
import { getBlog } from "../lib/microcms";
const response = await getBlog();


export const delContent: object = delTags(response.content);
export const image_list = makeImageList(delContent as Object);

function delTags(obj: String) {
    const work_str = obj.replace(/<br>/g, "\n").replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/&nbsp;/g, " ");
    return (JSON.parse(work_str));
}

function makeImageList(obj: object) {
    var i = 0;
    let work_name_image_list = [];
    let work_name_list = [];
    for (const [keyname, value] of Object.entries(obj)) {

        for (let info of value.page_info) {
            for (let url of info.image_urls) {

                let workImageUrl = [keyname, info.title, info.date, info.page_url, url];
                // console.log(workImageUrl);
                work_name_image_list.push(workImageUrl);
            }
            // console.log(nogizka_blog_images[key]['page_info'][numPage]['title']);
            // for (let imageUrl of info) {
            //     console.log(imageUrl);

            // console.log(work_name_image_list[0][0]);
        }

    }
    return (work_name_image_list);


}
