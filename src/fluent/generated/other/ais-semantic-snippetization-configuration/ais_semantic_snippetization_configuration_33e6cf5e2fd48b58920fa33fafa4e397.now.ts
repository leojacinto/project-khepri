import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['33e6cf5e2fd48b58920fa33fafa4e397'],
    table: 'ais_semantic_snippetization_configuration',
    data: {
        enable_pre_processing: 'false',
        limit: '250',
        limited_by: 'WORDS',
        max_total_words: '500',
        overlap_sentences: '5',
        semantic_script: `/** 
 * 
 * @param {Dictionary} semanticIndexPayload 
 *   Dictionary of key-value pairs, with each pair representing a semantic index field. 
 *     Key is the field's column name (element as per sys_dictionary). 
 *     Value is the display value for the semantic index field. 
 * 
 * @return {string} 
*   This string value is embedded exactly as it's specified here. 
*/
(function preProcessing(semanticIndexPayload) {
	return '';
})(semanticIndexPayload);`,
        snippet_mode: 'PASSAGE',
    },
})
