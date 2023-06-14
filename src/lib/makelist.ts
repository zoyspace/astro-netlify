import { getImage } from "astro:assets";
import { getBlog } from "../lib/microcms";
const response = await getBlog();
const maxNumber = 50;

const delContent: object = delTags(response.content);
const image_list = makeImageList(delContent as Object);
export const sorted_image_list = sortListInList(image_list);
// console.log(sorted_image_list);
// console.log(
// 	await getImage({
// 		src: sorted_image_list[3][4],
// 		format: "avif",
// 		height: 500,
// 		width: 500,
// 	})
// );

function delTags(obj: String) {
	const work_str = obj
		.replace(/<br>/g, "\n")
		.replace(/<p>/g, "")
		.replace(/<\/p>/g, "")
		.replace(/&nbsp;/g, " ");
	return JSON.parse(work_str);
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
	return work_name_image_list;
}
function sortListInList(arr: any[]) {
	let work_list = [];
	work_list = arr.sort((a, b) => (a[2] > b[2] ? -1 : 1));
	return work_list.slice(0, maxNumber - 1);
}
