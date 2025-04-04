import React, { useState, useEffect} from "react";
import axios from "axios";
import { Drawer, Button, Input, Form , Select, Upload, message, DatePicker} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { LuCloudUpload } from "react-icons/lu";
import { crearCategoria } from "../../servicios/blogServicios";

const { TextArea } = Input;
const { Option } = Select;

const CrearDrawer = ({ open, onClose, listaCategorias}) => {


    const [formulario ] = Form.useForm();

    const [ nombre, setNombre ] = useState('');

    const clearForm = () => {
        setNombre('');

    }

    const guardarCategoria = async (e) => {
        e.preventDefault();
        try {

            const values = await formulario.validateFields();
  
            const formData = new FormData();
            formData.append('nombre', values.nombre);

            const response = await crearCategoria(formData);
            onClose();
            clearForm();
            formulario.resetFields();
            await listaCategorias();
        } catch (error) {
            console.log('Error', error);
        }
    }

    useEffect(() => {
        if (!open) {
            clearForm();
        }
    }, [open]);

    return (
        <>

        <Drawer
            title="Crear Entrada"
            width={530}
            onClose={onClose}
            open={open}
            footer={
                <div>
                    <Button onClick={onClose}>Cerrar</Button>
                    {/* <Button onClick={guardarCategoria}>Crear</Button> */}
                    <Button onClick={guardarCategoria}>Crear</Button>
                </div>
            }
        >
            <Form form={formulario}>
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[{
                        required: true,
                        message: 'Por favor ingrese el nombre de la categoria',
                    }]}
                >
                    <Input />
                </Form.Item>
            </Form>


        </Drawer>
        
        
        </>
    )
}

export default CrearDrawer;