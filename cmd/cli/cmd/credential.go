package cmd

import (
	"github.com/spf13/cobra"
	"github.com/ChaosXu/nerv/lib/cli/format"
)

func init() {

	var credential = &cobra.Command{
		Use:        "credential [command] [flags]",
		Short:        "Manage all topologies's credential",
		Long:        "Manage all topologies's credential",
		RunE: credentialCmdFn,
	}
	RootCmd.AddCommand(credential)

	//list
	var list = &cobra.Command{
		Use:    "list",
		Short:    "List all credentials",
		Long:    "List all credentails",
		RunE: listObjsFunc("Credential",
			&format.Page{List:"data", Columns:[]format.Column{
				{Name:"ID", Format:"%v"},
				{Name:"type", Label:"Name", Format:"%s"},
				{Name:"name", Format:"%s"},
				{Name:"user", Format:"%s"},
			}}),
	}
	list.Flags().StringVarP(&flag_config, "config", "c", "../config/config.json", "The path of config.json. Default is ../config/config.json ")
	credential.AddCommand(list)

	//get
	var get = &cobra.Command{
		Use:    "get",
		Short:    "Get a credential",
		Long:    "Get all credential",
		RunE: getCredential,
	}
	get.Flags().UintVarP(&flag_id, "id", "i", 0, "Credential id")
	get.Flags().StringVarP(&flag_config, "config", "c", "../config/config.json", "The path of config.json. Default is ../config/config.json ")
	credential.AddCommand(get)


	//create
	var create = &cobra.Command{
		Use:    "create",
		Short:    "Create a credential",
		Long:    "Create a credential",
		RunE: createObjFunc("Credential"),
	}
	create.Flags().StringVarP(&flag_data_path, "Data", "D", "", "The path of json credential")
	create.Flags().StringVarP(&flag_config, "config", "c", "../config/config.json", "The path of config.json. Default is ../config/config.json ")
	credential.AddCommand(create)


	//delete
	var delete = &cobra.Command{
		Use:    "delete",
		Short:    "Delete a credential",
		Long:    "Delete a credential",
		RunE: removeObjFunc("Topology"),
	}
	delete.Flags().UintVarP(&flag_id, "id", "i", 0, "Credential id")
	delete.Flags().StringVarP(&flag_config, "config", "c", "../config/config.json", "The path of config.json. Default is ../config/config.json ")
	credential.AddCommand(delete)
}

func credentialCmdFn(cmd *cobra.Command, args []string) error {
	return nil
}
