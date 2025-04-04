import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, Form, message, Spin } from "antd";
import { crearCategoria } from "../../servicios/blogServicios";

const CrearDrawer = ({ open, onClose, listaCategorias }) => {
    const [formulario] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const clearForm = () => {
        formulario.resetFields();
    };

    const guardarCategoria = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const values = await formulario.validateFields();
            const formData = new FormData();
            formData.append('nombre', values.nombre);

            await crearCategoria(formData);
            message.success('Categoría creada exitosamente');
            onClose();
            await listaCategorias();
        } catch (error) {
            console.error('Error:', error);
            message.error(error.response?.data?.message || 'Error al crear la categoría');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!open) {
            clearForm();
        }
    }, [open]);

    return (
        <Drawer
            title={<span style={{ fontSize: '18px', fontWeight: '600' }}>Crear Nueva Categoría</span>}
            width={530}
            onClose={onClose}
            open={open}
            destroyOnClose
            footer={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose} style={{ marginRight: '8px' }}>
                        Cancelar
                    </Button>
                    <Button 
                        onClick={guardarCategoria} 
                        type="primary"
                        loading={loading}
                    >
                        Guardar
                    </Button>
                </div>
            }
            bodyStyle={{ paddingBottom: 80 }}
        >
            <Spin spinning={loading}>
                <Form 
                    form={formulario}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label={<span style={{ fontWeight: '500' }}>Nombre de la categoría</span>}
                        name="nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el nombre de la categoría',
                            },
                            {
                                min: 3,
                                message: 'El nombre debe tener al menos 3 caracteres',
                            },
                            {
                                max: 50,
                                message: 'El nombre no puede exceder los 50 caracteres',
                            }
                        ]}
                    >
                        <Input 
                            placeholder="Ej: Tecnología, Viajes, Cocina..." 
                            allowClear
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default CrearDrawer;