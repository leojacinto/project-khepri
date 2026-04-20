import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '0f1a5cb22fd40bd880e0653bcfa4e344': {
                        table: 'ais_semantic_component_field'
                        id: '0f1a5cb22fd40bd880e0653bcfa4e344'
                    }
                    '16825cfa2f900bd880e0653bcfa4e3e4': {
                        table: 'ais_ai_agent_semantic_search_configuration_m2m'
                        id: '16825cfa2f900bd880e0653bcfa4e3e4'
                    }
                    '78a731ae2f1883d880e0653bcfa4e349': {
                        table: 'sys_app_application'
                        id: '78a731ae2f1883d880e0653bcfa4e349'
                    }
                    '83f9dc722fd40bd880e0653bcfa4e39d': {
                        table: 'ais_semantic_component_field'
                        id: '83f9dc722fd40bd880e0653bcfa4e39d'
                    }
                    '9f0a5c722fd40bd880e0653bcfa4e3cb': {
                        table: 'ais_semantic_component_field'
                        id: '9f0a5c722fd40bd880e0653bcfa4e3cb'
                    }
                    b3d910722fd40bd880e0653bcfa4e3d1: {
                        table: 'ais_semantic_component_field'
                        id: 'b3d910722fd40bd880e0653bcfa4e3d1'
                    }
                    'bh-hr-Symbol(Now.UNRESOLVED)': {
                        table: 'x_snc_khepri_budget_history'
                        id: '2c328959f7aa421e95c66b096ec9920e'
                    }
                    'bh-it-ops-Symbol(Now.UNRESOLVED)': {
                        table: 'x_snc_khepri_budget_history'
                        id: '8ff54337838a42479b9a8d39c11597a8'
                    }
                    'bh-mkt-Symbol(Now.UNRESOLVED)': {
                        table: 'x_snc_khepri_budget_history'
                        id: 'a9b0cd2fd6df42feaa8bbe8b72047dea'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '3c7d0627afd74123a89655bba079901e'
                    }
                    'br-auto-publish-search-profile': {
                        table: 'sys_script'
                        id: '0ddd7d09c28b4cf68f72ea051c126683'
                    }
                    c2825cfa2f900bd880e0653bcfa4e3dd: {
                        table: 'ais_ai_agent_semantic_search_configuration_m2m'
                        id: 'c2825cfa2f900bd880e0653bcfa4e3dd'
                    }
                    'csp-aia-agent-config-create': {
                        table: 'sys_scope_privilege'
                        id: 'ad38887b5bcc4597b7d6e09d2691c94b'
                    }
                    'csp-aia-agent-config-read': {
                        table: 'sys_scope_privilege'
                        id: '51b66fead7724b4caccb1486d7205515'
                    }
                    'csp-aia-agent-config-write': {
                        table: 'sys_scope_privilege'
                        id: 'df61c99252c940e094ffee0afe0d87dd'
                    }
                    'csp-aia-agent-create': {
                        table: 'sys_scope_privilege'
                        id: '7748c1abbcd84e408cbfe7a1d5694aa0'
                    }
                    'csp-aia-agent-read': {
                        table: 'sys_scope_privilege'
                        id: '095c487648124c0b943124bcc61abc9f'
                    }
                    'csp-aia-agent-tool-m2m-create': {
                        table: 'sys_scope_privilege'
                        id: 'fb8abe643a3643eeb30b33cbde2b3222'
                    }
                    'csp-aia-agent-tool-m2m-read': {
                        table: 'sys_scope_privilege'
                        id: 'c89e478f08bd43d79610b77d98214131'
                    }
                    'csp-aia-agent-tool-m2m-write': {
                        table: 'sys_scope_privilege'
                        id: '9070976681ba456f8a1c5e2b243aa958'
                    }
                    'csp-aia-agent-write': {
                        table: 'sys_scope_privilege'
                        id: '3607980bdc9a4ab1b44dd838e96c5c00'
                    }
                    'csp-aia-strategy-read': {
                        table: 'sys_scope_privilege'
                        id: 'a6bcaa630a0a4e38bb46eaa471df2db9'
                    }
                    'csp-aia-tool-create': {
                        table: 'sys_scope_privilege'
                        id: '44683f8297894178977e6a396ff9fe37'
                    }
                    'csp-aia-tool-read': {
                        table: 'sys_scope_privilege'
                        id: '321d2ca16e074419993fa5d0a2c15493'
                    }
                    'csp-aia-tool-write': {
                        table: 'sys_scope_privilege'
                        id: 'c8db286a70034b3ba4bdbd0f2e68fe7a'
                    }
                    'csp-ais-datasource-create': {
                        table: 'sys_scope_privilege'
                        id: '1f4179d1391b42f1b1e6b117ac558bc4'
                    }
                    'csp-ais-datasource-read': {
                        table: 'sys_scope_privilege'
                        id: '194f7db74620485a8526b6256ae8e555'
                    }
                    'csp-ais-datasource-write': {
                        table: 'sys_scope_privilege'
                        id: 'ace69ac6a0154ce984f5e7983d1ae8b5'
                    }
                    'csp-ais-ds-attr-create': {
                        table: 'sys_scope_privilege'
                        id: 'd0dff6020e2142db8914721576fc065b'
                    }
                    'csp-ais-ds-attr-read': {
                        table: 'sys_scope_privilege'
                        id: '37a0259bb03d4ad78eaf3d6de78b4c77'
                    }
                    'csp-ais-profile-source-m2m-create': {
                        table: 'sys_scope_privilege'
                        id: '77cd70424b61431187d40e7692cf1f12'
                    }
                    'csp-ais-profile-source-m2m-read': {
                        table: 'sys_scope_privilege'
                        id: '450721c92059431c90a9d3f151020263'
                    }
                    'csp-ais-search-profile-create': {
                        table: 'sys_scope_privilege'
                        id: '819bc92229574664aeeb0fedab3a0f72'
                    }
                    'csp-ais-search-profile-read': {
                        table: 'sys_scope_privilege'
                        id: '6d8caf6cabac4671b6a6594a0c18093b'
                    }
                    'csp-ais-search-profile-write': {
                        table: 'sys_scope_privilege'
                        id: '4685d81be52844268774e27cd34a98d2'
                    }
                    'csp-ais-search-source-create': {
                        table: 'sys_scope_privilege'
                        id: '547ac2b348f744d2929d11dc489197f7'
                    }
                    'csp-ais-search-source-read': {
                        table: 'sys_scope_privilege'
                        id: '31fd691382c4422cbf1f983b4df0f201'
                    }
                    'csp-ais-search-source-write': {
                        table: 'sys_scope_privilege'
                        id: 'cff105e1973c42e499a37dd234e065da'
                    }
                    'csp-ais-semantic-m2m-create': {
                        table: 'sys_scope_privilege'
                        id: 'bdd76a9c7eff46a7b0b49c136beb7c22'
                    }
                    'csp-ais-semantic-m2m-read': {
                        table: 'sys_scope_privilege'
                        id: '01b5f7937ac645daa9ac7c5577092a33'
                    }
                    'csp-ais-semantic-m2m-write': {
                        table: 'sys_scope_privilege'
                        id: '4aded359bbaf44eea77274c2c6cf46b3'
                    }
                    'csp-ais-synchronizer-execute': {
                        table: 'sys_scope_privilege'
                        id: '8279da0745fb466d8794a5242baa2b18'
                    }
                    'csp-finance-case-create': {
                        table: 'sys_scope_privilege'
                        id: '5f3f2b6a1a6042c18c1e6dda2dd4c7b6'
                    }
                    d3c918322fd40bd880e0653bcfa4e328: {
                        table: 'ais_semantic_component_field'
                        id: 'd3c918322fd40bd880e0653bcfa4e328'
                    }
                    e62a14f22fd40bd880e0653bcfa4e32a: {
                        table: 'ais_semantic_component_field'
                        id: 'e62a14f22fd40bd880e0653bcfa4e32a'
                    }
                    e677e97177c74c04aa3167dc99859a2f: {
                        table: 'ais_search_source'
                        id: 'e677e97177c74c04aa3167dc99859a2f'
                        deleted: true
                    }
                    e6d00768a73e43668401dc684d8ace18: {
                        table: 'ais_datasource'
                        id: 'e6d00768a73e43668401dc684d8ace18'
                        deleted: true
                    }
                    'fv-cc-budget-0': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: 'e20d38c506cb4d169f12061d07803fa8'
                    }
                    'fv-cc-budget-1': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: '3d8e971be0a74e4d9bdb2874f102401d'
                    }
                    'fv-cc-budget-10': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: 'bd655431fd4440c9a14e07a7cf5c0197'
                    }
                    'fv-cc-budget-2': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: '7f90f7b270a64502941beb9514597949'
                    }
                    'fv-cc-budget-3': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: '7a76afd8a854491d8268477f0690a4fa'
                    }
                    'fv-cc-budget-4': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: '16cb500b4ca44c38b538a5a9b41becce'
                    }
                    'fv-cc-budget-5': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: 'ffa8de59a2ee43599437c81212873a5f'
                    }
                    'fv-cc-budget-6': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: '8005a0f3e37c4600a7d179ea4593404f'
                    }
                    'fv-cc-budget-7': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: 'fb1649727c264069b6dbdb4940ada763'
                    }
                    'fv-cc-budget-8': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: '580e2c9c74af40e9a5506b6c4e879b91'
                    }
                    'fv-cc-budget-9': {
                        table: 'x_snc_khepri_cc_budget_history'
                        id: '1d2aec8f7e384355ab501c5f4b7cedf9'
                    }
                    'fv-cc-budget-datasource-v2': {
                        table: 'ais_datasource'
                        id: 'bed6a7a5729042149ad7e672ee7530ad'
                    }
                    'fv-cc-budget-ds-attr': {
                        table: 'ais_datasource_attribute'
                        id: 'c64cfe18fe3d4a829fe706cf2cfe44c8'
                    }
                    'fv-cc-budget-fa-cost-center': {
                        table: 'ais_datasource_field_attribute'
                        id: 'fa0b3f42bce14f41a2f225c2ffcbebdc'
                    }
                    'fv-cc-budget-fa-description': {
                        table: 'ais_datasource_field_attribute'
                        id: '527a901eb2b3405ba685f0136ad2186e'
                    }
                    'fv-cc-budget-profile-source-m2m': {
                        table: 'ais_search_profile_ais_search_source_m2m'
                        id: '7954720dd00946e6adfba4dd4f520e80'
                    }
                    'fv-cc-budget-search-app': {
                        table: 'sys_search_context_config'
                        id: 'c40f62a8f5fa4ccba8d22082dbe41c75'
                    }
                    'fv-cc-budget-search-profile': {
                        table: 'ais_search_profile'
                        id: '3e160b91e88f48cebdd3fdacb4dd7e98'
                    }
                    'fv-cc-budget-search-source-v2': {
                        table: 'ais_search_source'
                        id: 'f77edf5520c249a69d7f1ae5c42f7d7e'
                    }
                    'fv-cc-budget-semantic-index': {
                        table: 'ais_semantic_index_configuration'
                        id: '253f7a50156942a5add9bf9c2b110106'
                    }
                    'fv-cc-budget-snippet-config': {
                        table: 'ais_semantic_snippetization_configuration'
                        id: '26b368bc56ff4993b165bacd26af7be1'
                    }
                    'fv-event-0': {
                        table: 'x_snc_khepri_expense_event'
                        id: '42c7d9595929454394195dde01c7e709'
                    }
                    'fv-event-1': {
                        table: 'x_snc_khepri_expense_event'
                        id: '6e1c5fb965a14ce99744feec3bd6a8ad'
                    }
                    'fv-event-2': {
                        table: 'x_snc_khepri_expense_event'
                        id: '45be447d886c4e128be2debbe52a821a'
                    }
                    'fv-expense-0': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: '3db442e3fcfd4c0eafc3feae003e14a9'
                    }
                    'fv-expense-1': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: '2e2a20353c3645b79a159fc49238dff0'
                    }
                    'fv-expense-2': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: '031c358db6ef46a2b65215b4bc3aaf8a'
                    }
                    'fv-expense-3': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: '10d5cf1ebf694d6b951828dbcfc57b00'
                    }
                    'fv-expense-4': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: '4a2f37ffec3c45389064c532eaf7a0c3'
                    }
                    'fv-expense-5': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: '6534c4fa82e248b889fe7d486408445f'
                    }
                    'fv-expense-6': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: 'd17bfca3928145afa3515c8b5859cebf'
                    }
                    'fv-expense-7': {
                        table: 'x_snc_khepri_expense_transactions'
                        id: '38848f09e16f418f95d14bee375a7aa1'
                    }
                    'fv-expense-datasource-v2': {
                        table: 'ais_datasource'
                        id: 'a34fcff421f94bb0b20691c7409c6fa1'
                    }
                    'fv-expense-ds-attr': {
                        table: 'ais_datasource_attribute'
                        id: '1c5846f10450406391e3885c8e032f47'
                    }
                    'fv-expense-fa-description': {
                        table: 'ais_datasource_field_attribute'
                        id: '088c02f50c6b45cb9e195a5814bd3602'
                    }
                    'fv-expense-fa-vendor': {
                        table: 'ais_datasource_field_attribute'
                        id: 'd6ebf4fe1fe444b891d17964a72522c9'
                    }
                    'fv-expense-profile-source-m2m': {
                        table: 'ais_search_profile_ais_search_source_m2m'
                        id: '58c82253745b4e3c9f8078424f24807d'
                    }
                    'fv-expense-search-app': {
                        table: 'sys_search_context_config'
                        id: '12766f6f24584fa48740b93e343d2a6f'
                    }
                    'fv-expense-search-profile': {
                        table: 'ais_search_profile'
                        id: '8fc43a23c6c64cc0b2c138b78140149a'
                    }
                    'fv-expense-search-source-v2': {
                        table: 'ais_search_source'
                        id: '01d3288c838646dfa8bf7f1ce31d4de6'
                    }
                    'fv-expense-semantic-index': {
                        table: 'ais_semantic_index_configuration'
                        id: '4f34c9a8d24c454289fa63ca210f09ec'
                    }
                    'fv-expense-snippet-config': {
                        table: 'ais_semantic_snippetization_configuration'
                        id: '9a8546121c5243958fb3eddb79b636a6'
                    }
                    'fv-khepri-agent': {
                        table: 'sn_aia_agent'
                        id: '1134f66ab132451b923710e6b1cb8786'
                    }
                    'fv-khepri-agent-acl': {
                        table: 'sys_security_acl'
                        id: 'b8a95bbd0f4e4f3f920ced709593ba91'
                    }
                    'khepri-auto-publish-job': {
                        table: 'sysauto_script'
                        id: 'd3c1ff4cc8b14f24b6bc1cf1194b793c'
                    }
                    'khepri-budget-datasource-v2': {
                        table: 'ais_datasource'
                        id: 'e6d00768a73e43668401dc684d8ace18'
                        deleted: true
                    }
                    'khepri-budget-search-profile': {
                        table: 'ais_search_profile'
                        id: 'fd5a54ef37584f488eb379dea710b369'
                    }
                    'khepri-budget-search-source-v2': {
                        table: 'ais_search_source'
                        id: 'e677e97177c74c04aa3167dc99859a2f'
                        deleted: true
                    }
                    'khepri-mcp-alias': {
                        table: 'sys_alias'
                        id: '5e06b519cc9c4d95bcca6fd305936211'
                    }
                    'khepri-mcp-connection': {
                        table: 'http_connection'
                        id: 'c3990c696eb54d23a348ca3f810bbcb4'
                    }
                    'khepri-mcp-credential': {
                        table: 'api_key_credentials'
                        id: 'aeddb7abcecf49649fb412959ee044c1'
                    }
                    KhepriBudgetVarianceAnalysis: {
                        table: 'sys_script_include'
                        id: 'e11775d15e08423ca4a515ab5f8b8649'
                    }
                    KhepriExtractCostCenter: {
                        table: 'sys_script_include'
                        id: 'f83b3568ac364deba1c73a20d7f8b6bf'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'c1396abd79ff48ff85b4ce661afdb361'
                    }
                    'src_server_auto-publish-search-profile_js': {
                        table: 'sys_module'
                        id: 'fb3dba3f79ec4da68d637e1cc2bd5ddb'
                    }
                    'src_server_scheduled-scripts_auto-publish-profiles_js': {
                        table: 'sys_module'
                        id: '259c07baaa4840abb51ad2345e159ecf'
                    }
                    'src_server_script-includes_khepri-budget-variance-analysis_js': {
                        table: 'sys_module'
                        id: '72103d44a5c34c429fa0da9452c7a2e2'
                    }
                    'src_server_script-includes_khepri-extract-cost-center_js': {
                        table: 'sys_module'
                        id: '90453b03ec8a49c28ed18d8820d2e087'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '041a19a9ba634768b269f37d9574eb73'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'variance'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '05ad38ffb58f4a9993aade0d366aeb47'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'fiscal_year'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0602404c41d044388703e2500388c823'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'variance_pct'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '09cddf66ce0642a79b07d9ec322f162d'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'region'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0b4a30a33d6e4fbaac24d6b4e834ccc5'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'status'
                            value: 'on_target'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '0f778e9f44ea43c5b4bd13c55d518923'
                        deleted: true
                        key: {
                            agent: '53e05c74f31d4534afddc3aff5609449'
                            tool: '0768f1dffbd246a0b1e59e5dd0b64962'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '10fffaa101c74a54b299234a64b70b38'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '127259357415406081b6c572389079be'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '13f55aa24e4743258ce165cd57efd17a'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '1db8d563ec0b4b0583568ff8fe7e5ddd'
                        key: {
                            name: 'Extract Cost Center'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1debc6161e9d49c482995a8f0aa3cfaa'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f6d216cd36e49f8b96a2f873a80655a'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'actual_spend'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2066039368d24b349af41278eda034f7'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '239e4dcf1270425784ca3272aad49d7c'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'billing_period'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '267df46324fe4b299d4ddc03a37b1afa'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '30a7b5ae2f1883d880e0653bcfa4e37f'
                        key: {
                            name: 'x_snc_khepri.user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '30def247d6704c6b87bdf9597c3ebed1'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '311f105d7d8b422283b7969a19253ee3'
                        key: {
                            sys_security_acl: 'b8a95bbd0f4e4f3f920ced709593ba91'
                            sys_user_role: 'b0593b350a0a0aa7001d689e4542dc28'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '34488b3245674dc290cbba029244c2d9'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'variance_pct'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '36196ab177f840e387f448fcde4734bd'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'cost_center_description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '389704aee32a4ba1bdbf6283b2628a14'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'expense_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a31826c92c244b1b52d59bd8d8b3b56'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3d6e29e1e15a4a0daf747401bb89dfe3'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3da508ade0a64fb882874e6fb24fe706'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '40be613b84b54d28baf5a40138719262'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4197dcdd4f3549b88dfe3f3d9104972c'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'fiscal_year'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '42f4b0566f5d435b9ce8a6dcdb83653a'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4555d2888dd9422ebf04448e6db9898c'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'actual_spend'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4773ca05334043c89de1ae79f0b4a1ba'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '48e55d10c19c4cdba88f7bd259cfffa2'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'expense_category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d313d4c5fa2489aa0fcc8af6dae38ad'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'correlation_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d754025822b4c67be3b101fedb1588c'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'expense_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '51b6a1822eb048238195eae49545857f'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'gl_account'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '53868a92520f497fbbd39b7860b9f3d6'
                        key: {
                            agent: '1134f66ab132451b923710e6b1cb8786'
                            tool: '1db8d563ec0b4b0583568ff8fe7e5ddd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5483baf67ebb4a6cbbd3195f20a8981e'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'timestamp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54eac45f9b7f4819aa48bc91f4d97ea0'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '55134da283dd4a0b890273931e703b94'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '59fdc9c646cd469c9392c74883ee649e'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'gl_account'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d7c8f6a80204669923ebcca1959a8a7'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5eeddb98ad684eb09101af5aad9f896d'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'actual_spend'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '613e6009f0b94d31a0c34fe348a38bfb'
                        key: {
                            agent: '1134f66ab132451b923710e6b1cb8786'
                            tool: '8062c1f0c9194223b23b1a0c28e5606a'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61d9ffcee36c41438790dae64c412518'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'invoice_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '673d6c540d13404ba19b4b9b33176f00'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'service_category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '692b537af3244db09b6144084ce8a786'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'correlation_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6b99a254dcdf44f486e039bf9d467045'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '6defe3c6eb064d76ad8ef11b4c0026f4'
                        key: {
                            name: 'Budget Variance Analysis'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6df66329134548ff899e78f2cba07c06'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'gl_account'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '6faad3e2b0994eeb8c25760e05a7526b'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6fe0d2251edf48b291d6ffbc2070ee53'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'invoice_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7178745d90ca490e93d9bc3a5c63f425'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'cost_center_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72034674ee5441fa925cbcdeb9404457'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'fiscal_year'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '72647d109a474e6ebfd586298db3962d'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'status'
                            value: 'over_budget'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '745e8ce04d0e4bfb8a3e043447abe3e4'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '764027220e8745feaebe193314820014'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'monthly_budget'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '7fe67b20ecf0426886852551e53c1419'
                        deleted: true
                        key: {
                            agent: '53e05c74f31d4534afddc3aff5609449'
                            tool: 'b85683d49c334deb9020b0818dbc5764'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '8062c1f0c9194223b23b1a0c28e5606a'
                        key: {
                            name: 'Khepri CC Budget History RAG'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81d2639af9304876a0409177224844c9'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '81f7f5f071394d2a928e0732eb4adf83'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'actual_spend'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '824e5dbb5a4e4e739eb33ee52bbd5083'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '87aa20142a81415294b3c03aa320bf86'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '894b1e05cfb942d9858caa0b5458566c'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93c19867585f48c5bf2f29c33953d0f5'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'fiscal_month'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '96578620038f49a3a137c192b8547898'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'status'
                            value: 'under_budget'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9763022e8b7c4ae8a47160cf3b396f17'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9d27ee85d8344211a7c3da42d88f9304'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '9e22a1006cac41b794f16cda2b86a40f'
                        key: {
                            agent: '1134f66ab132451b923710e6b1cb8786'
                            tool: '6defe3c6eb064d76ad8ef11b4c0026f4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9e934b5f83c04def99cbeb5249f17b2d'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'fiscal_month'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9edd4ee5fd71425b935b439e2827d071'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'variance'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a083201edaf3419b96fcf696ce7a63a2'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'billing_period'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a28cbf06b6da42dc9211b818a9fa8b12'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a3ce82e6e04041f4887b0288a47c462e'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'gl_account'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: 'a3ead1b239654021b9f82f3c5bfa6602'
                        key: {
                            agent: '1134f66ab132451b923710e6b1cb8786'
                            tool: 'e60f652a11a54b738b895b9d0d670999'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a52c480d55d4478293c2561424d3e85a'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'business_unit'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'a882de56e8d6416fba62a347c774b839'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aabe4c76cc4841d1a34b2843ba5bb4a0'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'event_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ad0e81e478854119ad13ba99eee1f63e'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'af6601fac134443da0fe34e772933b26'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af8d7eae9bb94246b896b155eaea9b7a'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'fiscal_month'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b0a4c8bac40840d1abafd4252202eb5f'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'monthly_budget'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b111b73fcf174801809b5990f4ee1844'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'fiscal_year'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b182d354d09549ff9ff7a0ca07ff0b3d'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'monthly_budget'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1a5b9c9390642c094f8fed74f60d0e8'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'variance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b85e7b41958d45de9b380d5edfadef17'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'expense_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'b9acdb2cad354ece845f7101f200b6f6'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba98da0158f34ec8aad24fbff280987a'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb71752fb9814ee78fa3f611bb400f5e'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'event_type'
                        }
                    },
                    {
                        table: 'sn_aia_agent_config'
                        id: 'bb8e6158e13f44f28eb78db4ee78d9fa'
                        key: {
                            agent: '1134f66ab132451b923710e6b1cb8786'
                        }
                    },
                    {
                        table: 'sn_aia_version'
                        id: 'bc0e278f6eb348e386a30756286c3490'
                        key: {
                            target_id: '1134f66ab132451b923710e6b1cb8786'
                            version_name: 'v1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bc8257a2ed284458bee709a006f78e8f'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bef819f5b4bc4db08d18bb975ad6145d'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c01bb4ce1c484581b58557066643f49d'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'business_unit'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd52bece16b54e1ba0a80e6009228401'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ce2b388b75ea4926a2b333caa0c93bbf'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'source_system'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cf3803e8679f4665b387a7d5fa6616ae'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'event_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf644eda0ff1466c88c0654ae05b38fc'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd0977129d1d348fbbc7c214835adcec2'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'expense_category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd1818824c7924801ad7cdfbb4aee5479'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'event_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd39af9ec021e4d8fa029125c081b85ba'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'fiscal_month'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd6d6d1d8898d44248c65a5be13c00782'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'cost_center_description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd7bebb0a3fb842218c5fe914a990f663'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd879a8a240b3486fb721a09d79663819'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: 'd932a0dd78f340689f5d5b4e3d634fb7'
                        key: {
                            agent: '1134f66ab132451b923710e6b1cb8786'
                            tool: 'fa3848dca2dc4148b93fdba3b9c92295'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da9e1b7f3e2e406ab3820662c718d778'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'service_category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: 'dc1696ee9af64d828a245d53508206f7'
                        key: {
                            name: 'Khepri Extract Cost Center'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dcc8cbf25df1414fbb365bcfcea67c61'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'df0087efb38b4e0c8d580fef217b387e'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e413941bdcc14751b1b0a77958260892'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'amount_usd'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: 'e60f652a11a54b738b895b9d0d670999'
                        key: {
                            name: 'Khepri Expense Transactions RAG'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e7fa6ec0fcf3464c8a1666ceee822fc3'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'variance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9f89aa872fd46af9815ae56b5d13f6f'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea6d8b8c1839429aa68bd4f0113ca210'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'monthly_budget'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb217f765ebb43618cbac5fe7483f5cf'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'source_system'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: 'ed3bcab396e144a19b400e81c682eeb2'
                        deleted: true
                        key: {
                            agent: '53e05c74f31d4534afddc3aff5609449'
                            tool: 'ba8a43a9dd034717aa2e24697bd725d3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'edfbbe2f36324befb020f968405db167'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'expense_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee617a288a5a479494555923375c4137'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef90292e1a4c44c684e41a4b8f2d9c8d'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'cost_center_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f1b8d963da2b4a0f815d7d036c29f8dd'
                        key: {
                            name: 'x_snc_khepri_cc_budget_history'
                            element: 'variance_pct'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f5408816ebac4ce8b69f3530e9f68266'
                        key: {
                            name: 'x_snc_khepri_budget_history'
                            element: 'variance_pct'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6b8c967c860421ea3d511cad115a39e'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f83a555ba77b41f9ba04ac73f120afff'
                        key: {
                            name: 'x_snc_khepri_expense_transactions'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: 'fa3848dca2dc4148b93fdba3b9c92295'
                        key: {
                            name: 'Khepri Neon SQL Query'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: 'fb6398f22fd00bd880e0653bcfa4e3d4'
                        deleted: true
                        key: {
                            agent: '1134f66ab132451b923710e6b1cb8786'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fcea95afe9e644b2b1987837ba92b5f5'
                        key: {
                            name: 'x_snc_khepri_expense_event'
                            element: 'amount_usd'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
